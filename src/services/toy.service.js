import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"

const TOY_KEY = 'toyDB'
const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]
_createDemoData()

export const toyService = {
    labels,
    query,
    getById,
    remove,
    save,
    getEmptyToy,
    getDefaultFilter
}

function query() {
    return storageService.query(TOY_KEY)
}

function getById(toyId) {
    return storageService.get(TOY_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(TOY_KEY, toy)
    } else {
        return storageService.post(TOY_KEY, toy)
    }
}

function getEmptyToy(name = 'Placeholder', price = 50, img = '', labels = []) {
    return {
        _id: '', name, price, img, labels, createdAt: 0, inStock: false
    }
}

function getDefaultFilter() {
    return { name: '', inStock: true, labels: [] }
}

function _createDemoData() {
    console.log(!JSON.parse(localStorage.getItem(TOY_KEY)).length);
    if (!JSON.parse(localStorage.getItem(TOY_KEY)) || !JSON.parse(localStorage.getItem(TOY_KEY)).length) {
        let toys = []
        toys.push(getEmptyToy('Lego, Deathstar ', 110))
        toys.push(getEmptyToy('Buzzlightyear ', 50))
        toys.push(getEmptyToy('Lego, Porsche 911 GT3 ', 90))
        toys.push(getEmptyToy('Lego, R2D2 ', 150))
        toys[0]._id = utilService.makeId()
        toys[0].img = 'https://www.lego.com/cdn/cs/set/assets/bltaf4abeb820733858/75159_alt1.jpg'

        toys[1]._id = utilService.makeId()
        toys[1].img = 'https://upload.wikimedia.org/wikipedia/en/a/a7/Buzz_Lightyear_of_star_command_poster.jpg'

        toys[2]._id = utilService.makeId()
        toys[2].img = 'https://image.ceneostatic.pl/data/products/44837026/i-lego-technic-42056-porsche-911-gt3-rs.jpg'

        toys[3]._id = utilService.makeId()
        toys[3].img = 'https://img.zap.co.il/pics/1/8/4/0/62690481c.gif'

        localStorage.setItem(TOY_KEY, JSON.stringify(toys))
    }
}