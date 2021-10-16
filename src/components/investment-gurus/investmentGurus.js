import React, { useState, useRef, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import useFetch from 'use-http'

import ModalWindow from '../modalWindow'
import DefaultDataGridTable from '../defaultDataGridTable'
import { SymbolNameField, PureFieldWithValueCheck, PercentField, KMBTField } from '../../common/reactUtils'
import { FinvizUrl, DataromaUrl, ZacksUrl, InsidermonkeyUrl } from '../../common/common'

import investmentGurusStyle from './investmentGurus.module.scss'
import '../muiTablePagination.css'

const InvestmentGurus = ({ loadingAnimeRef }) => {

  const modalWindowRef = useRef({
    popModalWindow: null,
    popPureModal: null,
  })

  const showColListRef = useRef({})

  const getTableColTemplate = (showColList) => {
    return Object.keys(showColList).map((key) => {
      if (key === 'Symbol') {
        return SymbolNameField(key, showColList[key].text, 130, showColList[key].show)
      } else if (key === 'GurusCount'){
        return {
          field: key, headerName: showColList[key].text, width: 130, colShow: showColList[key].show
        }
      } else if (key === 'Close' || key === 'PE' || key === 'PB') {
        return PureFieldWithValueCheck(key, showColList[key].text, 110, 2, showColList[key].show)
      } else if (key === 'Dividend' || key === 'High52' || key === 'Low52' || 
        key === 'PerfWeek' || key === 'PerfMonth' || key === 'PerfQuarter' || key === 'PerfHalfY' || key === 'PerfYear' || key === 'PerfYTD') {
        return PercentField(key, showColList[key].text, 110, showColList[key].show)
      } else {
        return KMBTField(key, showColList[key].text, 130, 2, showColList[key].show)
      }
    })
  }

  const getTableCol = () => {
    return getTableColTemplate(showColListRef.current).reduce((accumulator, currentValue) => {
      if (currentValue.colShow) {
        accumulator.push(currentValue)
      }
      return accumulator
    }, [])
  }
  const [tableCol, setTableCol] = useState(getTableCol())

  const renderCheckbox = (key) => {
    return <FormControlLabel
      key={key}
      control={
        <Checkbox
          onChange={() => {
            showColListRef.current[key].show = !showColListRef.current[key].show
            setTableCol(getTableCol())
          }}
          name={showColListRef.current[key].text}
          color="primary"
          checked={showColListRef.current[key].show}
        />
      }
      label={
        <div>{showColListRef.current[key].text}</div>
      }
    />
  }

  const renderDataRefDesc = (manager_list) => {
    return <>
      <Typography style={{ margin: "10px 0px" }}>
        {"Data Reference: "}
        <Link href={FinvizUrl} target="_blank" rel="noreferrer noopener" style={{ paddingRight: "15px" }}>
          <span>{"Finviz"}</span>
        </Link>
        <Link href={DataromaUrl} target="_blank" rel="noreferrer noopener" style={{ paddingRight: "15px" }}>
          <span>{"Dataroma"}</span>
        </Link>
        <Link href={ZacksUrl} target="_blank" rel="noreferrer noopener" style={{ paddingRight: "15px" }}>
          <span>{"Zacks"}</span>
        </Link>
        <Link href={InsidermonkeyUrl} target="_blank" rel="noreferrer noopener" style={{ paddingRight: "15px" }}>
          <span>{"Insider Monkey"}</span>
        </Link>
        <br />
        {"More Gurus Activity: "}
        {manager_list.map((val) => {
          console.log(val)
          return <>
            <Link href={val["link"]} target="_blank" rel="noreferrer noopener" style={{ paddingRight: "10px" }}>
              <span>{val["name"]}</span>
            </Link>
            {" "}
          </>
        })}
      </Typography>
    </>
  }

  const fetchStockData = useFetch({ cachePolicy: 'no-cache' })
  const fetchGurusData = useFetch({ cachePolicy: 'no-cache' })
  const getData = async (url, fetchObj) => {
    const resp_data = await fetchObj.get(url)
    if (fetchObj.response.ok && resp_data) {
      return resp_data
    }
    else {
      return null
    }
  }
  const getGurusData = () => {
    Promise.all([
      getData("/norn-data/stock/stat.json", fetchStockData),
      getData('/norn-data/gurus/gurus-table.json', fetchGurusData),
    ]).then((allResponses) => {
      console.log(allResponses)
      if (allResponses.length == 2 && allResponses[0] !== null && allResponses[1] !== null) {
        let gurus_data = allResponses[1]["data"]
        let manager_list = allResponses[1]["manager_list"]
        let output = Object.keys(gurus_data).map((symbol, index) => {
          let stockInfo = allResponses[0][symbol]
          let o = {
            id: index,
            Symbol: symbol,
            Close: stockInfo !== undefined && stockInfo !== null && stockInfo['Close'] !== '-' ? stockInfo['Close'] : -Number.MAX_VALUE,
            PE: stockInfo !== undefined && stockInfo !== null && stockInfo['P/E'] !== '-' ? stockInfo['P/E'] : Number.MAX_VALUE,
            PB: stockInfo !== undefined && stockInfo !== null && stockInfo['P/B'] !== '-' ? stockInfo['P/B'] : Number.MAX_VALUE,
            Dividend: stockInfo !== undefined && stockInfo !== null && stockInfo['Dividend %'] !== '-' ? stockInfo['Dividend %'] : -Number.MAX_VALUE,
            High52: stockInfo !== undefined && stockInfo !== null && stockInfo['52W High'] !== '-' ? stockInfo['52W High'] : -Number.MAX_VALUE,
            Low52: stockInfo !== undefined && stockInfo !== null && stockInfo['52W Low'] !== '-' ? stockInfo['52W Low'] : -Number.MAX_VALUE,
            PerfWeek: stockInfo !== undefined && stockInfo !== null && stockInfo['Perf Week'] !== '-' ? stockInfo['Perf Week'] : -Number.MAX_VALUE,
            PerfMonth: stockInfo !== undefined && stockInfo !== null && stockInfo['Perf Month'] !== '-' ? stockInfo['Perf Month'] : -Number.MAX_VALUE,
            PerfQuarter: stockInfo !== undefined && stockInfo !== null && stockInfo['Perf Quarter'] !== '-' ? stockInfo['Perf Quarter'] : -Number.MAX_VALUE,
            PerfHalfY: stockInfo !== undefined && stockInfo !== null && stockInfo['Perf Half Y'] !== '-' ? stockInfo['Perf Half Y'] : -Number.MAX_VALUE,
            PerfYear: stockInfo !== undefined && stockInfo !== null && stockInfo['Perf Year'] !== '-' ? stockInfo['Perf Year'] : -Number.MAX_VALUE,
            PerfYTD: stockInfo !== undefined && stockInfo !== null && stockInfo['Perf YTD'] !== '-' ? stockInfo['Perf YTD'] : -Number.MAX_VALUE,
            GurusCount: 0,
            GurusValue: 0
          }
          manager_list.forEach((val) => {
            o[val["name"]] = 0
          })

          let gurus_count = 0
          let gurus_value = 0
          gurus_data[symbol].forEach((val)=>{
            o[val["name"]] = val["value"]
            gurus_count += 1
            gurus_value += val["value"]
          })
          o.GurusCount = gurus_count
          o.GurusValue = gurus_value
          return o
        })

        showColListRef.current = {
          Symbol: { show: true, text: 'Symbol' },
          Close: { show: true, text: 'Price' },
          PE: { show: true, text: 'P/E' },
          PB: { show: true, text: 'P/B' },
          Dividend: { show: true, text: 'Dividend %' },
          High52: { show: true, text: '52W High' },
          Low52: { show: true, text: '52W Low' },
          PerfWeek: { show: true, text: 'Perf Week' },
          PerfMonth: { show: true, text: 'Perf Month' },
          PerfQuarter: { show: true, text: 'Perf Quarter' },
          PerfHalfY: { show: true, text: 'Perf Half Y' },
          PerfYear: { show: true, text: 'Perf Year' },
          PerfYTD: { show: true, text: 'Perf YTD' },
          GurusCount: { show: true, text: 'Gurus Count' },
          GurusValue: { show: true, text: 'Gurus Value' },
        }

        manager_list.forEach((val) => {
          showColListRef.current[val["name"]] = { show: true, text: val["name"] }
        })

        setDataRefDesc(renderDataRefDesc(manager_list))
        setTableCol(getTableCol())
        setRowData(output)
      } else {
        modalWindowRef.current.popModalWindow(<div>Load some data failed</div>)
      }
      loadingAnimeRef.current.setLoading(false)
    }).catch(() => {
      modalWindowRef.current.popModalWindow(<div>Can't get data</div>)
      loadingAnimeRef.current.setLoading(false)
    })
  }

  const [dataRefDesc, setDataRefDesc] = useState(<></>)

  const [rowData, setRowData] = useState([])

  useEffect(() => {
    // componentDidMount is here!
    // componentDidUpdate is here!
    getGurusData()

    return () => {
      // componentWillUnmount is here!
    }
  }, [])

  return (
    <>
      <div className={investmentGurusStyle.container}>
        <div className={investmentGurusStyle.showColumn}>
          {Object.keys(showColListRef.current).map((key) => {
            return renderCheckbox(key)
          })}
          {dataRefDesc}
        </div>
        <div className={investmentGurusStyle.table}>
          <DataGrid rows={rowData} columns={tableCol} autoPageSize={true} components={{ noRowsOverlay: DefaultDataGridTable, }} disableSelectionOnClick />
        </div>
      </div>
      <ModalWindow modalWindowRef={modalWindowRef} />
    </>
  )
}

export default InvestmentGurus