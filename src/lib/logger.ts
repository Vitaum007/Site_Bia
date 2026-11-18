/** Centraliza logs de erro da aplicação para manter a regra quality/no-direct-console ativa. */
export function logError(error: unknown): void {
  console.error(error);
}
