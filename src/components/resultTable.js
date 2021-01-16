import React, { useState, useRef } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { DataGrid, GridOverlay } from '@material-ui/data-grid'
import { isMobile } from 'react-device-detect'
import { makeStyles } from '@material-ui/core/styles'

import { convertKMBT } from '../common/utils'
import { FinvizUrl, YahooFinanceEnUrl, YahooFinanceZhUrl } from '../common/common'
import { NMUrl } from '../common/nm'

import resultTableStyle from './resultTable.module.scss'
import './resultTable.css'

const useNoDataStyles = makeStyles((theme) => ({
  root: {
    flexDirection: 'column',
    '& .ant-empty-img-1': {
      fill: theme.palette.type === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
      fill: theme.palette.type === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
      fill: theme.palette.type === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
      fill: theme.palette.type === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
      fillOpacity: theme.palette.type === 'light' ? '0.8' : '0.08',
      fill: theme.palette.type === 'light' ? '#f5f5f5' : '#fff',
    },
  },
  label: {
    marginTop: theme.spacing(1),
  },
}))

function NoDataInTable() {
  const classes = useNoDataStyles()

  return (
    <GridOverlay className={classes.root}>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <div className={classes.label}>No Data</div>
    </GridOverlay>
  )
}

const ResultTable = ({ResultTableRef}) => {

  const data = useStaticQuery(graphql`
    query {
      bomb1: file(relativePath: { eq: "bomb1.png" }){
        childImageSharp {
          fixed(width: 42) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }  
      }

      bomb2: file(relativePath: { eq: "bomb2.png" }){
        childImageSharp {
          fixed(width: 42) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }  
      }

      bomb3: file(relativePath: { eq: "bomb3.png" }){
        childImageSharp {
          fixed(width: 42) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }  
      }

      bomb4: file(relativePath: { eq: "bomb4.png" }){
        childImageSharp {
          fixed(width: 42) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }  
      }

      bomb5: file(relativePath: { eq: "bomb5.png" }){
        childImageSharp {
          fixed(width: 42) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }  
      }

      bomb1_2: file(relativePath: { eq: "bomb1-2.png" }){
        childImageSharp {
          fixed(width: 42) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }  
      }

      bomb2_2: file(relativePath: { eq: "bomb2-2.png" }){
        childImageSharp {
          fixed(width: 42) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }  
      }

      bomb3_2: file(relativePath: { eq: "bomb3-2.png" }){
        childImageSharp {
          fixed(width: 42) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }  
      }

      bomb4_2: file(relativePath: { eq: "bomb4-2.png" }){
        childImageSharp {
          fixed(width: 42) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }  
      }

      bomb5_2: file(relativePath: { eq: "bomb5-2.png" }){
        childImageSharp {
          fixed(width: 42) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }  
      }

      finviz: file(relativePath: { eq: "finviz-favicon.png" }){
        childImageSharp {
          fixed(width: 32) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }  
      }
      
      yahoo: file(relativePath: { eq: "yahoo-favicon.png" }){
        childImageSharp {
          fixed(width: 32) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }  
      }      
    }
  `)

  const YahooFinanceUrl = (typeof window !== 'undefined' && navigator.language.includes('zh')) ? YahooFinanceZhUrl : YahooFinanceEnUrl

  // ResultTableRef API
  ResultTableRef.current = {
    setTable: (data)=>{
      setTableData(renderTable(data))
      containerRef.current.scrollIntoView({
        behavior: "smooth",
      })
    }
  }

  const renderTable = (data)=>{
    // workaround When the vertical scrollbar appears, the horizontal scrollbar is shown as well
    // root cause: OSX/Xubuntu: 15px (default scrollbarSize value), Windows: 17px
    // https://gitmemory.com/issue/mui-org/material-ui-x/660/737896038
    return <DataGrid rows={data} columns={tableHeader} scrollbarSize={17} pageSize={20} components={{noRowsOverlay: NoDataInTable,}} disableSelectionOnClick />
  }

  const tableHeaderTemplate = [
    { field: 'symbol', headerName: 'Symbol', width: 110, mobileShow: true },
    { field: 'sector', headerName: 'Sector', width: 155, mobileShow: false },
    { field: 'industry', headerName: 'Industry', width: 255, mobileShow: false },
    {
      field: 'marketCap',
      headerName: 'Market Cap',
      width: 130,
      renderCell: (params) => (
        <span>{convertKMBT(params.getValue('marketCap'), 2)}</span>
      ),
      mobileShow: false
    },
    { field: 'PE', headerName: 'P/E', width: 80, mobileShow: true },
    { field: 'PB', headerName: 'P/B', width: 80, mobileShow: true },
    { field: 'price', headerName: '	Price', width: 90, mobileShow: true },
    {
      field: 'change',
      headerName: 'Change',
      width: 110,
      renderCell: (params) => (
        <span style={{ fontWeight: 700, color: Math.sign(parseFloat(params.getValue('change'))) === 1 ? 'green' : Math.sign(parseFloat(params.getValue('change'))) === -1 ? 'red' : '' }}>{Math.sign(parseFloat(params.getValue('change'))) === 1 ? '+' : ''}{(params.getValue('change') * 100).toFixed(2) + "%"}</span>
      ),
      mobileShow: true
    },
    {
      field: 'volume',
      headerName: 'Volume',
      width: 110,
      renderCell: (params) => (
        <span>{convertKMBT(params.getValue('volume'), 2)}</span>
      ),
      mobileShow: false
    },
    { field: 'tactics', hide: true, mobileShow: true },
    {
      field: 'beneish_score',
      headerName: 'Beneish Model',
      width: 130,
      renderCell: (params) => (
        <div className={resultTableStyle.risk}>
          <a>
            <Img className={resultTableStyle.bombImg} fixed={
              isNaN(params.value) ? data.bomb3_2.childImageSharp.fixed :
                params.value < -2.22 ? data.bomb2_2.childImageSharp.fixed :
                  params.value < -1.78 ? data.bomb3_2.childImageSharp.fixed :
                    data.bomb4_2.childImageSharp.fixed
            } fadeIn={false} />
          </a>
          <span style={{ fontSize: 18 }}>({params.value === "NaN" ? params.value : params.value.toFixed(2)})</span>
        </div>
      ), 
      mobileShow: false
    },
    {
      field: 'risk',
      headerName: 'Risk',
      width: 130,
      renderCell: (params) => (
        <div className={resultTableStyle.risk}>
          <a href={NMUrl + '?api=get-def-scan&tactics=' + params.getValue('tactics') + '&symbol=' + params.getValue('symbol')} target="_blank" rel="noreferrer noopener">
            <Img className={resultTableStyle.bombImg} fixed={
              isNaN(params.value) ? data.bomb3.childImageSharp.fixed :
                params.value < 100 * (1 / 5.0) ? data.bomb1.childImageSharp.fixed :
                  params.value < 100 * (2 / 5.0) ? data.bomb2.childImageSharp.fixed :
                    params.value < 100 * (3 / 5.0) ? data.bomb3.childImageSharp.fixed :
                      params.value < 100 * (4 / 5.0) ? data.bomb4.childImageSharp.fixed :
                        data.bomb5.childImageSharp.fixed
            } fadeIn={false} />
          </a>
          <span style={{ fontSize: 18 }}>({params.value === "NaN" ? params.value : params.value + "%"})</span>
        </div>
      ), 
      mobileShow: true
    },
    {
      field: 'links',
      headerName: 'Links',
      width: 130,
      renderCell: (params) => (
        <div className={resultTableStyle.links}>
          <a href={FinvizUrl + 'quote.ashx?t=' + params.getValue('symbol')} target="_blank" rel="noreferrer noopener">
            <Img className={resultTableStyle.linkIcon} fixed={data.finviz.childImageSharp.fixed} fadeIn={false} />
          </a>
          <a href={YahooFinanceUrl + 'quote/' + params.getValue('symbol')} target="_blank" rel="noreferrer noopener">
            <Img className={resultTableStyle.linkIcon} fixed={data.yahoo.childImageSharp.fixed} fadeIn={false} />
          </a>
        </div>
      ), 
      mobileShow: true
    },
  ]

  const tableHeader = tableHeaderTemplate.reduce((accumulator, currentValue) => {
    if (!isMobile || currentValue.mobileShow){
      accumulator.push(currentValue)
    }
    return accumulator
  }, [])

  const [tableData, setTableData] = useState(renderTable([]))
  const containerRef = useRef()

  return (
    <div className={resultTableStyle.container} ref={containerRef}>
      {tableData}
    </div>
  )
}

export default ResultTable
