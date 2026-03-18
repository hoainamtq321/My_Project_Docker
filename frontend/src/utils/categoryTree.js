export const buildCategoryTree = (categories = []) =>{
    const map = {};
    const roots = [];

    categories.forEach((item)=>(
        map[item.id] = {...item,children:[]}
    ))

    categories.forEach(item =>{
        if(item.parent_id === null)
        {
            roots.push(map[item.id]);
        }
        else{
            map[item.parent_id]?.children.push(map[item.id])
        }
    });

    return roots;
}