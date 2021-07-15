import { onMounted, reactive, ref } from "@vue/composition-api"
import { messageTip } from '@/utils/ele'
import Utils from '@/utils/util'

/**
 * promiseFn: 请求的Promise函数
 * initParam: 初始化数据
 * router: vue-router 的router对象
 * */
export default (promiseFn, initParam = {}, router) => {
    const currentPage = Number(initParam.currentPage)
    const formModel = reactive({ ...initParam, currentPage: Number.isNaN(currentPage) ? 1 : currentPage })
    const loading = ref(false)
    const info = ref(null)
    onMounted (() => {
        loadingData()
    })

    const onBtnSearch = () => {
        formModel.currentPage = 1
        loadingData()
    }

    const getPage = (page) => {
        formModel.currentPage = page
        loadingData()
    }


    async function loadingData () {
        try {
            router.push({query: Utils.fmtParams(formModel)})
            loading.value = true
            const result = await promiseFn(formModel)
            info.value = result
            loading.value = false
        } catch (e) {
            console.log(e)
            if(e !== '拦截请求') {
                messageTip('error', '异常错误')
            }
            loading.value = false
        }
    }

    return {
        formModel,
        loading,
        info,
        onBtnSearch,
        getPage
    }
}