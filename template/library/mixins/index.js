
// 筛选时间段 格式化
// 如 不限 最近7天 最近30天
// @return 2018-01-10 17:14:47 格式
export const setFilterTime =  {
    methods: {
        getFilterTime(date) {
            const _d = date ? new Date(date) : new Date();
            const newDate = this.floatNum([_d.getFullYear(), _d.getMonth() + 1,  _d.getDate(), _d.getHours(),_d.getMinutes(), _d.getSeconds()]);
            return newDate;
        },
        floatNum(arr) {
            const _newArr = arr.map(item => {
                if(parseInt(item) < 10){
                    return item = `0${item}`;
                }
                return item;
            });
            return _newArr.slice(0,3).join('-') + ' ' + _newArr.slice(3, _newArr.length).join(':');
        }
    }
}