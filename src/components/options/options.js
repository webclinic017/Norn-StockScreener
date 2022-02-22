import React, { useState, useEffect, useRef, createRef } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import InfoIcon from '@mui/icons-material/Info'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import { blue } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/styles'
import shortid from 'shortid'
import useFetch from 'use-http'
import moment from 'moment'
import { isMobile } from 'react-device-detect'

import ModalWindow from '../modalWindow'
import DefaultDataGridTable from '../defaultDataGridTable'

import { getRedLevel, getBlueLevel } from '../../common/utils'
import { useInterval, GetDataByFetchObj, SymbolNameField, PureFieldWithValueCheck, PercentField, ColorPercentField, ColorPosGreenNegRedField, NoMaxWidthTooltip } from '../../common/reactUtils'
import { Options_Def, SelfQuery_Def, NornFinanceAPIUrl, SelfQueryNote, NornFinanceAPIServerGithub } from '../../common/optionsDef'

import commonStyle from '../common.module.scss'
import optionsStyle from './options.module.scss'


// query parameter
const genParameterField = (inputRef, name, value, display_name, gridsm) => {
  // add key to force re-render component
  return (
    <Grid item md={gridsm} xs={12} key={shortid.generate()}>
      <form noValidate autoComplete="off">
        <TextField id={name} className={optionsStyle.valueText} label={display_name} variant="outlined" defaultValue={value} size="small" inputRef={inputRef} />
      </form>
    </Grid>
  )
}

const ParameterNodesField = ({ queryParameterRef, queryParameterCurrentRef }) => {
  return SelfQuery_Def.parameters.map((value, index) => {
    return (
      genParameterField(queryParameterRef.current[index], value.name, queryParameterCurrentRef.current === null ? value.val : queryParameterCurrentRef.current[index], value.display_name, value.gridsm)
    )
  })
}

const Options = ({loadingAnimeRef}) => {

  const modalWindowRef = useRef({
    popModalWindow: null,
    popPureModal: null,
  })

  const tableColList = {
    Symbol: { hide: false, text: 'Symbol' },
    StockPrice: { hide: false, text: 'Price (Stock)' },
    ExpiryDate: { hide: false, text: 'Expiry' },
    Strike: { hide: false, text: 'Strike' },
    LastPrice: { hide: false, text: 'Last Price' },
    AvgEWMA: { hide: false, text: 'Valuation (Avg)' },
    PriceBias: { hide: false, text: 'Bias (Price)' },
    VolBias: { hide: false, text: 'Bias (Vol.)' },
    Delta: { hide: false, text: 'δ (Delta)' },
    Gamma: { hide: false, text: 'γ (Gamma)' },
    Rho: { hide: false, text: 'ρ (Rho)' },
    Theta: { hide: false, text: 'θ (Theta)' },
    Vega: { hide: false, text: 'ν (Vega)' },
    LastTradeDate: { hide: false, text: 'Last Trade Date' },
    Bid: { hide: false, text: 'Bid' },
    Ask: { hide: false, text: 'Ask' },
    Change: { hide: true, text: 'Change' },
    PercentChange: { hide: false, text: 'Change (%)' },
    Volume: { hide: false, text: 'Volume' },
    OpenInterest: { hide: false, text: 'Open Interest' },
    ImpliedVolatility: { hide: false, text: 'Implied Volatility' },
    EWMAHisVol: { hide: false, text: 'EWMA Historical Volatility' },
    BSM_EWMAHisVol: { hide: false, text: 'Black Scholes Merton' },
    MC_EWMAHisVol: { hide: false, text: 'Monte Carlo' },
    BT_EWMAHisVol: { hide: false, text: 'Binomial Tree' },
  }

  const genTableColTemplate = () => {
    return [
      SymbolNameField('symbol', 'Symbol', 130, 'symbol' in hideColState ? hideColState['symbol'] : false),
      PureFieldWithValueCheck("stockPrice", tableColList.StockPrice.text, 130, 2, "stockPrice" in hideColState ? hideColState["stockPrice"] : tableColList['StockPrice'].hide),
      {
        field: 'expiryDate',
        headerName: tableColList.ExpiryDate.text,
        width: 125,
        type: 'date',
        renderCell: (params) => (
          <span>{moment(params.row['expiryDate']).format('YYYY-MM-DD')}</span>
        ),
        hide: 'expiryDate' in hideColState ? hideColState['expiryDate'] : tableColList['ExpiryDate'].hide
      },
      PureFieldWithValueCheck("strike", tableColList.Strike.text, 120, 2, "strike" in hideColState ? hideColState["strike"] : tableColList['Strike'].hide),
      PureFieldWithValueCheck("lastPrice", tableColList.LastPrice.text, 140, 2, "lastPrice" in hideColState ? hideColState["lastPrice"] : tableColList['LastPrice'].hide),
      PureFieldWithValueCheck("avgEWMA", tableColList.AvgEWMA.text, 150, 2, "avgEWMA" in hideColState ? hideColState["avgEWMA"] : tableColList['AvgEWMA'].hide),
      {
        field: "priceBias",
        headerName: tableColList.PriceBias.text,
        width: 120,
        type: 'number',
        renderCell: (params) => (
          params.value === "-" || params.value === -Number.MAX_VALUE || params.value === Number.MAX_VALUE || params.value === null || params.value === undefined || params.value === "Infinity" || params.value === 'NaN' ?
            <span>-</span> :
            <span style={{ fontWeight: 500, color: params.row['lastPrice'] > params.row['avgEWMA'] ? getRedLevel(params.value) : params.row['lastPrice'] < params.row['avgEWMA'] ? getBlueLevel(params.value) : '' }}>{params.value.toFixed(2)}</span>
        ),
        hide: "priceBias" in hideColState ? hideColState["priceBias"] : tableColList['PriceBias'].hide
      },
      PureFieldWithValueCheck("delta", tableColList.Delta.text, 90, 2, "delta" in hideColState ? hideColState["delta"] : tableColList['Delta'].hide),
      PureFieldWithValueCheck("gamma", tableColList.Gamma.text, 90, 2, "gamma" in hideColState ? hideColState["gamma"] : tableColList['Gamma'].hide),
      PureFieldWithValueCheck("rho", tableColList.Rho.text, 90, 2, "rho" in hideColState ? hideColState["rho"] : tableColList['Rho'].hide),
      PureFieldWithValueCheck("theta", tableColList.Theta.text, 90, 2, "theta" in hideColState ? hideColState["theta"] : tableColList['Theta'].hide),
      PureFieldWithValueCheck("vega", tableColList.Vega.text, 90, 2, "vega" in hideColState ? hideColState["vega"] : tableColList['Vega'].hide),
      {
        field: 'lastTradeDate',
        headerName: tableColList.LastTradeDate.text,
        width: 145,
        type: 'date',
        renderCell: (params) => (
          <span>{moment(params.row['lastTradeDate']).format('YYYY-MM-DD')}</span>
        ),
        hide: 'lastTradeDate' in hideColState ? hideColState['lastTradeDate'] : tableColList['LastTradeDate'].hide
      },
      PureFieldWithValueCheck("bid", tableColList.Bid.text, 105, 2, "bid" in hideColState ? hideColState["bid"] : tableColList['Bid'].hide),
      PureFieldWithValueCheck("ask", tableColList.Ask.text, 105, 2, "ask" in hideColState ? hideColState["ask"] : tableColList['Ask'].hide),
      ColorPosGreenNegRedField("change", tableColList.Change.text, 130, "change" in hideColState ? hideColState["change"] : tableColList['Change'].hide, 500),
      ColorPercentField("percentChange", tableColList.PercentChange.text, 140, 2, "percentChange" in hideColState ? hideColState["percentChange"] : tableColList['PercentChange'].hide, 500),
      PureFieldWithValueCheck("volume", tableColList.Volume.text, 140, 0, "volume" in hideColState ? hideColState["volume"] : tableColList['Volume'].hide),
      PureFieldWithValueCheck("openInterest", tableColList.OpenInterest.text, 140, 0, "openInterest" in hideColState ? hideColState["openInterest"] : tableColList['OpenInterest'].hide),
      PercentField("impliedVolatility", tableColList.ImpliedVolatility.text, 140, "impliedVolatility" in hideColState ? hideColState["impliedVolatility"] : tableColList['ImpliedVolatility'].hide),
      PercentField("EWMAHisVol", tableColList.EWMAHisVol.text, 140, "EWMAHisVol" in hideColState ? hideColState["EWMAHisVol"] : tableColList['EWMAHisVol'].hide),
      PureFieldWithValueCheck("BSM_EWMAHisVol", tableColList.BSM_EWMAHisVol.text, 140, 2, "BSM_EWMAHisVol" in hideColState ? hideColState["BSM_EWMAHisVol"] : tableColList['BSM_EWMAHisVol'].hide),
      PureFieldWithValueCheck("MC_EWMAHisVol", tableColList.MC_EWMAHisVol.text, 140, 2, "MC_EWMAHisVol" in hideColState ? hideColState["MC_EWMAHisVol"] : tableColList['MC_EWMAHisVol'].hide),
      PureFieldWithValueCheck("BT_EWMAHisVol", tableColList.BT_EWMAHisVol.text, 140, 2, "BT_EWMAHisVol" in hideColState ? hideColState["BT_EWMAHisVol"] : tableColList['BT_EWMAHisVol'].hide),
    ]
  }


  const fetchOptionsData = useFetch({ cachePolicy: 'no-cache' })

  const renderTable = (resp) => {
    // [{"symbol":"A","stockPrice":149.50999450683594,"EWMA_historicalVolatility":0.2519420533670158,"contracts":[{"expiryDate":"2022-01-21","calls":[{"lastTradeDate":"2022-01-12","strike":155.0,"lastPrice":0.32,"bid":0.35,"ask":0.5,"change":0.049999982,"percentChange":18.51851,"volume":30,"openInterest":721,"impliedVolatility":0.22461712890624996,"valuationData":{"BSM_EWMAHisVol":0.7042894690005248,"MC_EWMAHisVol":0.70279983534146,"BT_EWMAHisVol":0.7046023394736802}}],"puts":[]}]}
    var calls = []
    var puts = []
    resp.forEach((data) => {
      let symbol = data["symbol"]
      let stock_price = data["stockPrice"]
      let ewma_his_vol = data["EWMA_historicalVolatility"]
      data["contracts"].forEach((contracts) => {
        let expiry_date = contracts["expiryDate"]
        let extra_data_func = (calls_puts) => {
          let output = calls_puts.map((cp, index) => {
            let v = cp["valuationData"]
            let o = {
              id: index,
              symbol: symbol,
              stockPrice: stock_price,
              EWMAHisVol: ewma_his_vol,
              expiryDate: expiry_date,
              lastTradeDate: cp["lastTradeDate"] !== undefined && cp["lastTradeDate"] !== null && cp["lastTradeDate"] !== '-' ? cp["lastTradeDate"] : 0,
              strike: cp["strike"] !== undefined && cp["strike"] !== null && cp["strike"] !== '-' ? cp["strike"] : -Number.MAX_VALUE,
              lastPrice: cp["lastPrice"] !== undefined && cp["lastPrice"] !== null && cp["lastPrice"] !== '-' ? cp["lastPrice"] : -Number.MAX_VALUE,
              bid: cp["bid"] !== undefined && cp["bid"] !== null && cp["bid"] !== '-' ? cp["bid"] : -Number.MAX_VALUE,
              ask: cp["ask"] !== undefined && cp["ask"] !== null && cp["ask"] !== '-' ? cp["ask"] : -Number.MAX_VALUE,
              change: cp["change"] !== undefined && cp["change"] !== null && cp["change"] !== '-' ? cp["change"] : -Number.MAX_VALUE,
              percentChange: cp["percentChange"] !== undefined && cp["percentChange"] !== null && cp["percentChange"] !== '-' ? cp["percentChange"] / 100.0 : -Number.MAX_VALUE,
              volume: cp["volume"] !== undefined && cp["volume"] !== null && cp["volume"] !== '-' ? cp["volume"] : -Number.MAX_VALUE,
              openInterest: cp["openInterest"] !== undefined && cp["openInterest"] !== null && cp["openInterest"] !== '-' ? cp["openInterest"] : -Number.MAX_VALUE,
              impliedVolatility: cp["impliedVolatility"] !== undefined && cp["impliedVolatility"] !== null && cp["impliedVolatility"] !== '-' ? cp["impliedVolatility"] : -Number.MAX_VALUE,
              BSM_EWMAHisVol: v["BSM_EWMAHisVol"] !== undefined && v["BSM_EWMAHisVol"] !== null && v["BSM_EWMAHisVol"] > 0 ? v["BSM_EWMAHisVol"] : -Number.MAX_VALUE,
              MC_EWMAHisVol: v["MC_EWMAHisVol"] !== undefined && v["MC_EWMAHisVol"] !== null && v["MC_EWMAHisVol"] > 0 ? v["MC_EWMAHisVol"] : -Number.MAX_VALUE,
              BT_EWMAHisVol: v["BT_EWMAHisVol"] !== undefined && v["BT_EWMAHisVol"] !== null && v["BT_EWMAHisVol"] > 0 ? v["BT_EWMAHisVol"] : -Number.MAX_VALUE,
              delta: v["delta"] !== undefined && v["delta"] !== null ? v["delta"] : -Number.MAX_VALUE,
              gamma: v["gamma"] !== undefined && v["gamma"] !== null ? v["gamma"] : -Number.MAX_VALUE,
              rho: v["rho"] !== undefined && v["rho"] !== null ? v["rho"] : -Number.MAX_VALUE,
              theta: v["theta"] !== undefined && v["theta"] !== null ? v["theta"] : -Number.MAX_VALUE,
              vega: v["vega"] !== undefined && v["vega"] !== null ? v["vega"] : -Number.MAX_VALUE,
            }
            let cnt = 0
            let sum = 0
            if (o.BSM_EWMAHisVol > 0) {
              cnt += 1
              sum += o.BSM_EWMAHisVol
            }
            if (o.MC_EWMAHisVol > 0) {
              cnt += 1
              sum += o.MC_EWMAHisVol
            }
            if (o.BT_EWMAHisVol > 0) {
              cnt += 1
              sum += o.BT_EWMAHisVol
            }
            o["avgEWMA"] = sum / cnt
            o["priceBias"] = Math.abs(o.lastPrice - o["avgEWMA"]) / o.lastPrice
            return o
          })
          return output
        }
        calls = calls.concat(extra_data_func(contracts["calls"]))
        puts = puts.concat(extra_data_func(contracts["puts"]))
      })
    })

    // reset id
    calls.forEach((d, i) => {
      calls[i].id = i
    });
    puts.forEach((d, i) => {
      puts[i].id = i
    });

    console.log(calls)
    setCallsData(calls)
    console.log(puts)
    setPutsData(puts)
  }

  const renderOptionsData = (file_name) => {
    loadingAnimeRef.current.setLoading(true)
    Promise.all([
      GetDataByFetchObj('/norn-data/options/' + file_name + '.json', fetchOptionsData),
    ]).then((allResponses) => {
      console.log(allResponses)
      if (allResponses.length === 1 && allResponses[0] !== null) {
        renderTable(allResponses[0])
      } else {
        console.error("renderOptionsData some data failed")
        modalWindowRef.current.popModalWindow(<div>Get some data failed...</div>)
      }
      loadingAnimeRef.current.setLoading(false)
    }).catch(() => {
      console.error("renderOptionsData failed")
      modalWindowRef.current.popModalWindow(<div>Get data failed...</div>)
      loadingAnimeRef.current.setLoading(false)
    })
  }

  const refreshData = (name) => {
    if (name.startsWith('self_query')) {
      setDisplayQuery(true)
      setCallsData([])
      setPutsData([])
      loadingAnimeRef.current.setLoading(false)
    } else {
      setDisplayQuery(false)
      renderOptionsData(name)
    }
  }
  const [callsData, setCallsData] = useState([])
  const [putsData, setPutsData] = useState([])
  const [hideColState, setHideColState] = useState({})
  const [arg, setArg] = useState(0)
  const [displayQuery, setDisplayQuery] = useState(false)
  const [ws, setWs] = useState(null)



  const queryParameterRef = useRef([])
  SelfQuery_Def.parameters.forEach((value, index) => {
    queryParameterRef.current[index] = createRef()
    queryParameterRef.current[index].current = { value: value.val }
  })
  const queryParameterCurrentRef = useRef(null)

  useEffect(() => {
    // componentDidMount is here!
    // componentDidUpdate is here!
    refreshData(Options_Def[0].name)

    return () => {
      // componentWillUnmount is here!
    }
  }, [])

  useInterval(() => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send("") // heartbeat
      console.log("heartbeat")
    }
  }, ws ? 3000 : null)

  useEffect(() => {
    if (ws) {
      ws.onopen = () => {
        loadingAnimeRef.current.setLoading(true)
        console.log('WebSocket Connected')
      }
      ws.onmessage = (e) => {
        const message = JSON.parse(e.data)
        console.log(message)
        renderTable([message])
        loadingAnimeRef.current.setLoading(false)
        setWs(null)
      }
    }
    return () => {
    }
  }, [ws])
  
  return (
    <div className={commonStyle.defaultFont + ' ' + optionsStyle.container}>
      <div key={shortid.generate()} >
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormControl size="small" variant="outlined" className={optionsStyle.optionsTableSelect}>
              <InputLabel htmlFor="arg-select">{'Options Valuation'}</InputLabel>
              <Select
                native
                value={arg}
                displayEmpty
                onChange={(event) => {
                  setArg(event.target.value)
                  refreshData(Options_Def[event.target.value].name)
                }}
                label={'Options Valuation'}
              >
                {
                  Options_Def.map((value, index) => {
                    return <option key={shortid.generate()} index={index} value={index}>{value.display_name}</option>
                  })
                }
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <div className={optionsStyle.queryPannel} style={{ display: displayQuery ? 'block' : 'none' }}>
          <div className={optionsStyle.parameterTitle}>
            <Typography variant="h6" gutterBottom component="div">
              {'Query Parameters'}
              <NoMaxWidthTooltip arrow title={<span style={{ whiteSpace: 'pre-line', lineHeight: '20px', textAlign: 'center'}}>{SelfQueryNote}</span>} >
                <IconButton onClick={() => window.open(NornFinanceAPIServerGithub, "_blank")}>
                  <InfoIcon color="action"/>
                </IconButton>
              </NoMaxWidthTooltip>
            </Typography>
          </div>
          <div className={optionsStyle.parameterBlock}>
            <Grid container spacing={2}>
              <ParameterNodesField queryParameterRef={queryParameterRef} queryParameterCurrentRef={queryParameterCurrentRef}/>
              <Grid item md={2} xs={12} >
                <Box display="flex" justifyContent="flex-end">
                  <ThemeProvider theme={createTheme({ palette: { primary: blue } })}>
                    <Button className={isMobile ? optionsStyle.queryBtnMobile : optionsStyle.queryBtn} variant="contained" color="primary" startIcon={<SearchIcon />} onClick={() => {
                      queryParameterCurrentRef.current = []
                      let args = SelfQuery_Def.parameters.reduce((accumulator, currentValue, currentIndex) => {
                        accumulator[currentValue.name] = queryParameterRef.current[currentIndex].current.value
                        queryParameterCurrentRef.current.push(accumulator[currentValue.name])
                        return accumulator
                      }, {})
                      console.log(args)
                      let query_string = "/ws/option/quote-valuation?" + Object.keys(args).map(function (key) { return key + "=" + args[key] }).join("&")
                      setWs(new WebSocket(NornFinanceAPIUrl + query_string))
                    }}>{'Query Now'}</Button>
                  </ThemeProvider>
                </Box>
              </Grid>
            </Grid>
          </div>
        </div>
        <div className={optionsStyle.table}>
          <DataGrid rows={callsData} columns={genTableColTemplate()} rowsPerPageOptions={[]} autoPageSize={true} components={{ NoRowsOverlay: DefaultDataGridTable, }} disableSelectionOnClick onColumnVisibilityChange={(param) => {
            let tempHideColState = hideColState
            tempHideColState[param['field']] = !param['isVisible']
            setHideColState(tempHideColState)
          }} initialState={{
            filter: {
              filterModel: {
                items: [{ columnField: 'lastPrice', operatorValue: '>', value: 0.1 }],
              },
            },
            sorting: {
              sortModel: [{ field: 'priceBias', sort: 'desc' }],
            },
          }}/>
        </div>
        <div className={optionsStyle.table}>
          <DataGrid rows={putsData} columns={genTableColTemplate()} rowsPerPageOptions={[]} autoPageSize={true} components={{ NoRowsOverlay: DefaultDataGridTable, }} disableSelectionOnClick onColumnVisibilityChange={(param) => {
            let tempHideColState = hideColState
            tempHideColState[param['field']] = !param['isVisible']
            setHideColState(tempHideColState)
          }} initialState={{
            filter: {
              filterModel: {
                items: [{ columnField: 'lastPrice', operatorValue: '>', value: 0.1 }],
              },
            },
            sorting: {
              sortModel: [{ field: 'priceBias', sort: 'desc' }],
            },
          }}/>
        </div>
      </div>
      <ModalWindow modalWindowRef={modalWindowRef} />
    </div>
  )
}

export default Options
