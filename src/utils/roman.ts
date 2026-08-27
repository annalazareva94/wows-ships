//для замены обычных цифр на римские. 
//ps: поиск считывает римские

export const toRoman = ((num: number) => {
    const romanDict: Record<number, string> = {
        1 : 'I',
        2 : 'II',
        3 : 'III',
        4 : 'IV',
        5 : 'V',
        6 : 'VI',
        7 : 'VII',
        8 : 'VIII',
        9 : 'IX',
        10 : 'X',
        11 : '★',
    }

    return romanDict[num]
})