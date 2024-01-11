function compareObjectsToUpdate(oldObj, newObj) {
    const alterObj = Object.entries(oldObj).reduce(function (acc, [key, value]) {
        if (newObj[key]) {
            return Object.assign(acc, { [key]: newObj[key] })
        }
        return Object.assign(acc, { [key]: value })

    }, {})
    return alterObj
}


module.exports = {
    compareObjectsToUpdate
}