export const addAttribute = () => {
    const attributes = useAttributes()
    const attribute = event!.target!.id

    if(!attributes.value.includes(attribute)) {
        attributes.value.push(attribute)
    } else {
        const element = attributes.value.indexOf(attribute)
        attributes.value.splice(element,1)
    }
};