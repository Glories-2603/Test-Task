"use strict";
let NativeUI = require('../nativeui');
const NMenu = NativeUI.Menu;
const MenuItem = NativeUI.UIMenuItem;
const MenuCheckboxItem = NativeUI.UIMenuCheckboxItem;
const MenuListItem = NativeUI.UIMenuListItem;
const Point = NativeUI.Point;
const Size = NativeUI.Size;
const ItemsCollection = NativeUI.ItemsCollection;

let _isShowInput;
let menuItem = null;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
class Menu {
    static Create(title, subtitle, isResetBackKey, isDisableAllControls, DisableAllControlsOnClose, spriteLib = 'commonmenu', spriteName = 'interaction_bgd') {
        try {
            this.HideMenu();


            menuItem = new NMenu(title, subtitle, new Point(this.GetScreenResolutionMantainRatio().Width - 450, 180), spriteLib, spriteName);

            menuItem.MouseControlsEnabled = false;
            menuItem.MouseEdgeEnabled = false;
            menuItem.Visible = true;
            menuItem.RefreshIndex();
        } catch (e) {
            console.log(e);
        }
/*
        if (isResetBackKey === true)
            menu.Reset(Menu.Controls.BACK);
*/
        return menuItem;
    }

    static GetScreenResolutionMantainRatio() {
        const gameScreen = mp.game.graphics.getScreenActiveResolution(0, 0);
        const screenw = gameScreen.x;
        const screenh = gameScreen.y;
        const height = 1080.0;
        const ratio = screenw / screenh;
        var width = height * ratio;

        return new Size(width, height);
    }

    static ItemsCollection(items) {
        return new ItemsCollection(items);
    }

    static AddMenuItem(title, subtitle = "") {
        let item = new MenuItem(title, subtitle);
        menuItem.AddItem(item);
        return item;
    }

    static AddMenuItemList(title, list, subtitle) {
        let item = new MenuListItem(title, subtitle, new ItemsCollection(list));
        menuItem.AddItem(item);
        return item;
    }

    static AddMenuItemCheckbox(title, subtitle, isChecked) {
        if (isChecked === undefined || isChecked == null)
            isChecked = false;

        let item = new MenuCheckboxItem(title, isChecked, subtitle);
        menuItem.AddItem(item);
        return item;
    }

    static GetCurrentMenu() {
        return menuItem;
    }


    static async GetUserInput(title, defaultText, maxInputLength = 20) {
        try {
            mp.game.ui.notifications.show("~b~Введите: ~s~" + title);
            _isShowInput = true;
            mp.gui.chat.activate(false);
            mp.game.gameplay.displayOnscreenKeyboard(1, 'FMMC_KEY_TIP8', "", defaultText, "", "", "", maxInputLength);
            while (mp.game.gameplay.updateOnscreenKeyboard() != 1 && mp.game.gameplay.updateOnscreenKeyboard() != 2 && mp.game.gameplay.updateOnscreenKeyboard() != 3)
                await sleep(1);
            if (mp.game.gameplay.updateOnscreenKeyboard() == 1) {
                _isShowInput = false;
                mp.gui.chat.activate(true);
                return mp.game.gameplay.getOnscreenKeyboardResult();
            }
            _isShowInput = false;
            mp.gui.chat.activate(true);
        }
        catch (e) {
        };
        return '';
    }

    static HideMenu() {
        if (menuItem != null) {

            mp.players.local.freezePosition(false);
            mp.gui.chat.activate(true);

            /*MenuItem.ItemSelect.clear();
            menuItem.IndexChange.clear();
            menuItem.ListChange.clear();
            menuItem.SliderChange.clear();
            menuItem.SliderSelect.clear();
            menuItem.CheckboxChange.clear();
            //menuItem.MenuOpen.clear();
            menuItem.MenuClose.clear();
            menuItem.MenuChange.clear();*/
            menuItem.Close();
            menuItem = null;
        }
    }
}

export default {Menu: Menu};