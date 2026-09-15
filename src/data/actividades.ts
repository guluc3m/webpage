// Shape agreed in guluc3m/webpage#9. Data lives in actividades.json (edit
// entries there); this file only types it.
export interface Actividad {
  title: string;
  date: string; // yyyy/mm/dd
  description?: string;
  cartel?: string; // poster image URL
  video?: string; // YouTube link
  repository?: string;
  transparencias?: string;
  photo?: string; // usually one OR the other of cartel/photo, not both
  speakers: { name: string; link?: string }[];
  tags: string[];
}
