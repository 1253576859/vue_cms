import { defineStore } from 'pinia'
import { getAmountListData } from '@/service/main/analysis/analysis'

interface IAnalysisState {
  amountList: any[]
}

const useAnalysisSytore = defineStore('analysis', {
  state: (): IAnalysisState => ({
    amountList: []
  }),
  actions: {
    async fetchAnalysisDataAction () {
      const amountResult = await getAmountListData()
      this.amountList = amountResult.data
    }
  },

})

export default useAnalysisSytore
