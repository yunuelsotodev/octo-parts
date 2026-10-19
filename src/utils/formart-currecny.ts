const formatter = new Intl.NumberFormat('en-MX', {
    style: 'currency',
    currency: 'MXN',
    currencyDisplay: 'narrowSymbol'
});

export const formatCurrency = (value: number) => formatter.format(value);