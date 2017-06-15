import {get as ajaxGet} from 'fe-util/ajax/get';

//==================================
// Todo数据通信相关接口
//==================================

/**
 * 接口URL
 */
const URL = {
    // Todo列表
    'list': '/api/v1/todo/page'
};

/**
 * 查询Todo列表数据
 */
export let listReq = (state = {}) => {
    let params = listParamsAdapter(getQueryConds(state));

    return ajaxGet({
        url : URL.list,
        data : params
    }).then(response => {
        let result = {
            success: true
        };
        let {success, data} = response || {};
        let {list, count} = data || {};
        if (success && list) {
            // 加载成功
            result.records = list.map(row => listDataAdapter(row));
            result.total = count;
        } else {
            // 加载失败
            result.success = false;
        }
        return result;
    }, error => {
        return { success : false };
    });
};

let getQueryConds = (listCondsState) => {
    let {startIndex, pageSize, conds} = listCondsState;
    return {
        startIndex,
        pageSize,
        conds
    }
}

let listParamsAdapter = (conds) => {
    return conds;
};

let listDataAdapter = (row) => {
    return row;
};
