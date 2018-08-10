export const NEW_LINE = 'NEW_LINE';



export const  newLine = (data = { active: '', prop: '', value: '' }) => {
    return {
        type: NEW_LINE,
        data
    }
}