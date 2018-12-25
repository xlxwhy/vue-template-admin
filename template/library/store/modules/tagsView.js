const tagsView = {
    state: {
      visitedViews: [],
      cachedViews: []
    },
    mutations: {
      ADD_VISITED_VIEWS: (state, view) => {
        console.log('view>>>>', view);
        // 菜单上是否已经存在此标签
        const _index = state.visitedViews.findIndex(v => v.path === view.path);
        if(_index > -1){
            
            // 这里的处理，改名避免缓存中修改的代码，切换到另一页面时，再换种参数，数据要重新拉新
            // 如果商品列表点编辑跳到编辑页面，如果只做缓存的时候，只拉到第一次的数据，以后都不请求ajax了
            // 又避免同一个编辑页面参数一样，切换回来，还保留着
            const cachedView_index = state.cachedViews.findIndex( v => v.name === view.name);
            if(state.cachedViews[cachedView_index] && state.cachedViews[cachedView_index].fullPath !== view.fullPath){
                // 替换掉
                state.cachedViews.splice(cachedView_index, 1);
                setTimeout(()=>{
                    state.cachedViews.push({
                        name: view.name,
                        fullPath: view.fullPath
                    })
                },10)
            }else{
                if(view.meta.cache && cachedView_index < 0){
                    state.cachedViews.push({
                        name: view.name,
                        fullPath: view.fullPath
                    })
                }
            }

            const query = view.query;
            if(Object.keys(query).length){
                return state.visitedViews.splice(_index, 1, {
                    name: view.name,
                    path: view.path,
                    query: view.query,
                    title: view.meta.title || 'no-name'
                })
            }
            return;
        }
        // if (state.visitedViews.some(v => v.path === view.path)) return
        state.visitedViews.push({
            name: view.name,
            path: view.path,
            query: view.query,
            title: view.meta.title || 'no-name'
        })
        
        // 是否需要缓存页面
        if (view.meta.cache) {
            state.cachedViews.push({
                name: view.name,
                fullPath: view.fullPath
            })
        }
      },
      DEL_VISITED_VIEWS: (state, view) => {
        for (const [i, v] of state.visitedViews.entries()) {
          if (v.path === view.path) {
            state.visitedViews.splice(i, 1)
            break
          }
        }
        for (const item of state.cachedViews) {
          if (item.name === view.name) {
            const index = state.cachedViews.findIndex(v => v.name == view.name);
            state.cachedViews.splice(index, 1);
            break
          }
        }
      },
      DEL_OTHERS_VIEWS: (state, view) => {
        for (const [i, v] of state.visitedViews.entries()) {
          if (v.path === view.path) {
            state.visitedViews = state.visitedViews.slice(i, i + 1)
            break
          }
        }
        for (const item of state.cachedViews) {
          if (item.name === view.name) {
            const index = state.cachedViews.findIndex(v => v.name == view.name);
            state.cachedViews = state.cachedViews.slice(index, i + 1);
            break
          }
        }
      },
      DEL_ALL_VIEWS: (state) => {
        state.visitedViews = []
        state.cachedViews = []
      }
    },
    actions: {
      addVisitedViews({ commit }, view) {
        commit('ADD_VISITED_VIEWS', view)
      },
      delVisitedViews({ commit, state }, view) {
        return new Promise((resolve) => {
          commit('DEL_VISITED_VIEWS', view)
          resolve([...state.visitedViews])
        })
      },
      delOthersViews({ commit, state }, view) {
        return new Promise((resolve) => {
          commit('DEL_OTHERS_VIEWS', view)
          resolve([...state.visitedViews])
        })
      },
      delAllViews({ commit, state }) {
        return new Promise((resolve) => {
          commit('DEL_ALL_VIEWS')
          resolve([...state.visitedViews])
        })
      }
    }
  }
  
  export default tagsView
  