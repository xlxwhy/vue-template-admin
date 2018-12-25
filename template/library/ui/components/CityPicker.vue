<template>
  <el-cascader style="width:100%;" :options="cityList" :props="props" :clearable="true" :filterable="true" change-on-select separator="-" v-model="defaults" @change="handleChange" v-loading="loading">
  </el-cascader>
</template>

<script>
import RegionApi from "@/apis/infra-basic/RegionApi.js";
import { Loading } from "element-ui";

export default {
  data() {
    return {
      defaults: [],
      props: {
        value: "label",
        children: "citys"
      },
      cityList: [],
      loading: false
    };
  },
  props: {
    defaultCity: {
      type: String,
      default: ""
    },
    clear: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    defaultCity(val) {
      console.log("defaultCity>>>", val);
      if (val) {
        this.defaults = val.split(" ");
        this.init();
      } else {
        this.defaults = [];
      }
    },
    clear(status) {
      console.log("isClear>>>", status);
      if (status) {
        this.defaults = [];
      }
    }
  },
  async mounted() {
    this.init();
  },
  methods: {
    async init() {
      this.loading = true;
      this.defaults = this.defaultCity ? this.defaultCity.split(" ") : [];
      let R = this.defaults;
      let province, city, area;
      let provinceArr, cityArr, areaArr;
      let currentProvince, currentCity, currentArea;
      //
      if (R.length == 0) {
        province = await this.getLocalCity(0, R[0]);
      }
      if (R.length == 1) {
        province = await this.getLocalCity(0, R[0]);
        city = await this.getLocalCity(province.current.regionId, null);
      }
      if (R.length == 2) {
        province = await this.getLocalCity(0, R[0]);
        city = await this.getLocalCity(province.current.regionId, R[1]);
        area = await this.getLocalCity(city.current.regionId, null);
      }
      if (R.length == 3) {
        province = await this.getLocalCity(0, R[0]);
        city = await this.getLocalCity(province.current.regionId, R[1]);
        area = await this.getLocalCity(city.current.regionId, R[2]);
      }

      if (province && province.local) {
        provinceArr = this.getRegionArr(province.local);
      }
      if (city && city.local) {
        cityArr = this.getRegionArr(city.local);
        currentProvince = provinceArr.find(
          v => v.regionId == province.current.regionId
        );
        currentProvince["citys"] = [...cityArr];
      }
      if (area && area.local) {
        areaArr = this.getRegionArr(area.local);
        currentCity = cityArr.find(v => v.regionId === city.current.regionId);
        currentCity["citys"] = [...areaArr];
      }

      this.cityList = [...provinceArr];
      this.loading = false;
    },

    async initNoUse() {
      console.log("defaults>>>", this.defaultCity);
      if (this.defaultCity) {
        this.defaults = this.defaultCity.split(" ");
      }

      // const _loading = Loading.service();
      this.loading = true;
      if (this.defaults && this.defaults.length) {
        const regionName = this.defaults;
        const _provinceName = regionName[0]; // 省名
        const _cityName = regionName[1]; // 市名
        const _areaName = regionName[2]; // 区名

        const province = await this.getLocalCity(0, _provinceName);

        const city = await this.getLocalCity(
          province.current.regionId,
          _cityName
        );
        const area = await this.getLocalCity(city.current.regionId, _areaName);

        const areaArr = this.getRegionArr(area.local);
        const cityArr = this.getRegionArr(city.local);
        const provinceArr = this.getRegionArr(province.local);
        const currentCity = cityArr.find(
          v => v.regionId === city.current.regionId
        );
        currentCity["citys"] = [...areaArr];
        const currentProvince = provinceArr.find(
          v => v.regionId == province.current.regionId
        );
        currentProvince["citys"] = [...cityArr];

        this.cityList = [...provinceArr];
        // console.log('in................', this.cityList)
        // this.defaults = [...regionName];
        // _loading.close();

        this.loading = false;
      } else {
        RegionApi.getRegionChildren({ regionId: 0 }, res => {
          const provinceArr = this.getRegionArr(res.data);
          this.cityList = [...provinceArr];
          // _loading.close();

          this.loading = false;
        });
      }
    },
    async getLocalCity(regionId, regionName) {
      return new Promise(resolve => {
        RegionApi.getRegionChildren({ regionId: regionId }, res => {
          const _data = res.data;
          const _city = _data.find(v => v.regionName == regionName);
          resolve({
            local: _data, // 所有(省 或 市 或 区) 数组
            current: _city // 当前(省 或 市 或 区) 对象
          });
        });
      });
    },
    getRegionArr(region) {
      const arr = [];
      region.forEach(item => {
        const o = {
          label: item.regionName,
          regionId: item.regionId
        };
        if (item.regionType < 5) {
          o["citys"] = [];
        }
        arr.push(o);
      });
      return arr;
    },
    async handleChange(val) {
      console.log(val);
      const { cityList } = this;
      const len = val.length;

      if (len != 3) {
        this.$emit("change-end", {
          city: val
        });
      }

      // 由于elementui 选择联动没有回调我的regionId; 只能用查找方式来找了
      // 省
      if (len == 1) {
        const provide = cityList.find(v => v.label === val[0]);
        if (!provide.citys.length) {
          RegionApi.getRegionChildren({ regionId: provide.regionId }, res => {
            const cityArr = this.getRegionArr(res.data);
            provide.citys = [...cityArr];
          });
        }
        // 市
      } else if (len == 2) {
        const provide = cityList.find(v => v.label === val[0]);
        const city = provide.citys.find(v => v.label === val[1]);
        if (!city.citys.length) {
          RegionApi.getRegionChildren({ regionId: city.regionId }, res => {
            const areaArr = this.getRegionArr(res.data);
            city.citys = [...areaArr];
          });
        }
        // 区
      } else {
        const provide = cityList.find(v => v.label === val[0]);
        const city = provide.citys.find(v => v.label === val[1]);
        const area = city.citys.find(v => v.label === val[2]);
        console.log(area.regionId);
        this.$emit("change-end", {
          regionId: area.regionId,
          city: val
        });
      }
    }
  }
};
</script>

<style>
.el-loading-mask.is-fullscreen {
  z-index: 111111;
}
</style>


