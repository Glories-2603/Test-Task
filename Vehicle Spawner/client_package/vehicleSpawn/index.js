import UIMenu from './modules/menu';

function FindVeh(name) {
    let menu = UIMenu.Menu.Create("Spawner", "Vehicle Find");
    let data = []
    for (let [key, value] of Object.entries(vehicles.cat)) {
        value.forEach(element => {
            if (element.name && element.name.includes(name))
                UIMenu.Menu.AddMenuItem(element.name);
        });
    }
    let down = UIMenu.Menu.AddMenuItem("~g~Назад");
    let closeItem = UIMenu.Menu.AddMenuItem("~r~Закрыть");
    menu.ItemSelect.on(async item => {
        UIMenu.Menu.HideMenu();
        if(item == down){
            MenuSpawnerVeh()
        }
        mp.events.callRemote("server:vehicleSpawn", item.title)
    });
}

function MenuSpawnerVeh() {
    let menu = UIMenu.Menu.Create("Spawner", "Vehicle spawner");

    let findveh = UIMenu.Menu.AddMenuItem("~y~Поиск");
    for (let [key, value] of Object.entries(vehicles.cat)) {
        let data = []
        value.forEach(element => {
            data.push(element.name)
        });
        UIMenu.Menu.AddMenuItemList(`Категория ${key}`, [data], `Вы можете заспавнить транспорт категории ${key}, пролистав машины`);
    }

    let closeItem = UIMenu.Menu.AddMenuItem("~r~Закрыть");
    menu.ItemSelect.on(async item => {
        UIMenu.Menu.HideMenu();
        if (item == findveh) {
            let name = methods.parseInt(await UIMenu.Menu.GetUserInput("Название", "", 15));
            if (name < 1) {
                mp.game.ui.notifications.show('~r~Название не может быть пустым');
                return false;
            }
            FindVeh(name);

        }
    });
}

mp.keys.bind(0x71, false, () => {
    MenuSpawnerVeh();
});