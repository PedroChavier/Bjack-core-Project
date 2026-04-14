// Utilitários de conversão e volatilização de moedas
// Será utilizado pelo WalletService para calcular valores em tempo real.

/**
 * Converte um valor de uma moeda para a moeda de referência central (ex: DGC).
 * TODO: integrar com API de cotação externa.
 */
export function convertToCentralCurrency(amount: number, _fromCurrency: string): number {
    // placeholder — implementar com API real
    return amount;
}

/**
 * Aplica volatilização dinâmica sobre o valor com base em fator de mercado.
 * TODO: buscar fator de volatilidade do banco ou cache.
 */
export function applyVolatility(amount: number, _currency: string): number {
    // placeholder — implementar lógica de volatilidade
    return amount;
}
