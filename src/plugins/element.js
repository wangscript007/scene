import Vue from 'vue'
import { 
    Button,
    Dialog,
    Input,
    Breadcrumb,
    BreadcrumbItem,
    Table,
    Pagination,
    Upload,
    Message,
    MessageBox
 } from 'element-ui'

Vue.use(Button)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Table)
Vue.use(Pagination)
Vue.use(Upload)

Vue.prototype.$message = Message
