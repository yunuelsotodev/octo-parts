import { Option } from "@/interfaces/option";

export const getYears = (): Array<Option> => {
    const currentYear: number = new Date().getFullYear();
    let years: Option[] = [];
    
    years.push({ 'label': 'Selecciona año', 'value': '' });

    for (let index = 1980; index <= currentYear; index++) {
        years.push({'label': `${index}`, 'value': `${index}`})
    }

    return years;
}