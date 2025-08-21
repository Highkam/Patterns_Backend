const sesiones = new Map<number, { id: number; email: string; role: string }>();

export function guardarSesion(user: any) {
  sesiones.set(user.id, { id: user.id, email: user.email, role: user.Role.name });
}

export function obtenerSesion(id: number) {
  return sesiones.get(id);
}