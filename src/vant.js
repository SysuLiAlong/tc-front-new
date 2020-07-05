// 按需全局引入 vant组件
import Vue from 'vue'
import {
  Button,
  Cell,
  Checkbox,
  Dialog,
  Divider,
  Field,
  Form,
  Grid,
  GridItem,
  Image,
  List,
  NavBar,
  Overlay,
  Picker,
  Popup,
  Search,
  Tabbar,
  TabbarItem,
  Toast,
  CheckboxGroup,
  Icon
} from 'vant'

Vue.use(NavBar)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Button)
Vue.use(Cell)
Vue.use(List)
Vue.use(Tabbar).use(TabbarItem)
Vue.use(Popup)
Vue.use(Toast)
Vue.use(Form)
Vue.use(Field)
Vue.use(Image)
Vue.use(Checkbox)
Vue.use(Search)
Vue.use(Dialog)
Vue.use(Picker)
Vue.use(Overlay)
Vue.use(Divider)
Vue.use(CheckboxGroup)
Vue.use(Icon);
