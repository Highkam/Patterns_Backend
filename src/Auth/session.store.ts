const sesiones = new Map<number, { id: number; email: string; roleId: number }>();

export function guardarSesion(user: { id: number; email: string; roleId: number }) {
  sesiones.set(user.id, { id: user.id, email: user.email, roleId: user.roleId });
}

export function obtenerSesion(id: number) {
  return sesiones.get(id);
}