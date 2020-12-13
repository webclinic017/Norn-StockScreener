export const FCDataTemplate = [
  {
    name: "Market Cap",
    display_name: "Market Cap",
    tooltip: "market capitalization",
    args_items: ["Any (> $50 mln)", "$50 mln - $300 mln", "$300 mln - $2 bln", "$2 bln - $10 bln", "$10 bln - $200 bln", "> $300 mln", "> $2 bln", "> $10 bln", "> $200 bln", "< $300 mln", "< $2 bln", "< $10 bln", "< $200 bln"],
    default_index: 5
  },
  {
    name: "Dividend %",
    display_name: "Dividend (%)",
    tooltip: "Dividend yield (annual)",
    args_items: ["Any", "> 0%", "> 1%", "> 2%", "> 3%", "> 4%", "> 5%", "> 6%", "> 7%", "> 8%", "> 9%", "> 10%"],
    //default_index: 6
    default_index: 0
  },
  {
    name: "ROA",
    display_name: "ROA",
    tooltip: "Return on Asserts (ttm)",
    args_items: ["Any", "> 5%", "> 10%", "> 15%", "> 20%", "> 25%", "> 30%", "< -5%", "< -10%", "< -15%", "< -20%", "< -25%", "< -30%"],
    //default_index: 3
    default_index: 0
  },
  {
    name: "ROE",
    display_name: "ROE",
    tooltip: "Return on Equity (ttm)",
    args_items: ["Any", "> 5%", "> 10%", "> 15%", "> 20%", "> 25%", "> 30%", "< -5%", "< -10%", "< -15%", "< -20%", "< -25%", "< -30%"],
    default_index: 3
  },
  {
    name: "ROI",
    display_name: "ROI",
    tooltip: "Return on Investment (ttm)",
    args_items: ["Any", "> 5%", "> 10%", "> 15%", "> 20%", "> 25%", "> 30%", "< -5%", "< -10%", "< -15%", "< -20%", "< -25%", "< -30%"],
    default_index: 2
  },
  {
    name: "P/E",
    display_name: "P/E Ratio",
    tooltip: "Price to Earnings (ttm)",
    args_items: ["Any", "< 5", "< 10", "< 15", "< 20", "< 25", "< 30", "< 40", "< 50", "> 5", "> 10", "> 15", "> 20", "> 25", "> 30", "> 40", "> 50"],
    default_index: 3
  },
  {
    name: "Forward P/E",
    display_name: "Forward P/E",
    tooltip: "Forward Price to Earnings (next fiscal year)",
    args_items: ["Any", "< 5", "< 10", "< 15", "< 20", "< 25", "< 30", "< 40", "< 50", "> 5", "> 10", "> 15", "> 20", "> 25", "> 30", "> 40", "> 50"],
    //default_index: 3
    default_index: 0
  },
  {
    name: "EPS this Y",
    display_name: "EPS this Y",
    tooltip: "EPS growth this year",
    args_items: ["Any", "> 5%", "> 10%", "> 15%", "> 20%", "> 25%", "> 30%", "< 5%", "< 10%", "< 15%", "< 20%", "< 25%", "< 30%"],
    //default_index: 3
    default_index: 0
  },
  {
    name: "EPS next Y",
    display_name: "EPS next Y",
    tooltip: "EPS growth next year",
    args_items: ["Any", "> 5%", "> 10%", "> 15%", "> 20%", "> 25%", "> 30%", "< 5%", "< 10%", "< 15%", "< 20%", "< 25%", "< 30%"],
    //default_index: 3
    default_index: 0
  },
  {
    name: "EPS next 5Y",
    display_name: "EPS next 5Y",
    tooltip: "EPS growth next 5 years",
    args_items: ["Any", "> 5%", "> 10%", "> 15%", "> 20%", "> 25%", "> 30%", "< 5%", "< 10%", "< 15%", "< 20%", "< 25%", "< 30%"],
    //default_index: 3
    default_index: 0
  },
  {
    name: "EPS past 5Y",
    display_name: "EPS past 5Y",
    tooltip: "EPS growth past 5 years",
    args_items: ["Any", "> 5%", "> 10%", "> 15%", "> 20%", "> 25%", "> 30%", "< 5%", "< 10%", "< 15%", "< 20%", "< 25%", "< 30%"],
    //default_index: 3
    default_index: 0
  },
  {
    name: "Sales past 5Y",
    display_name: "Sales past 5Y",
    tooltip: "Sales growth past 5 years",
    args_items: ["Any", "> 5%", "> 10%", "> 15%", "> 20%", "> 25%", "> 30%", "< 5%", "< 10%", "< 15%", "< 20%", "< 25%", "< 30%"],
    //default_index: 3
    default_index: 0
  },
  {
    name: "PEG",
    display_name: "PEG Ratio",
    tooltip: "Price to Earnings to Growth",
    args_items: ["Any", "< 1", "< 2", "< 3", "> 1", "> 2", "> 3"],
    //default_index: 1
    default_index: 0
  },
  {
    name: "P/S",
    display_name: "P/S Ratio",
    tooltip: "Price to Sales (ttm)",
    args_items: ["Any", "< 1", "< 2", "< 3", "< 4", "< 5", "> 1", "> 2", "> 3", "> 4", "> 5"],
    //default_index: 1
    default_index: 0
  },
  {
    name: "P/B",
    display_name: "P/B Ratio",
    tooltip: "Price to Book (mrq)",
    args_items: ["Any", "< 1", "< 2", "< 3", "< 4", "< 5", "> 1", "> 2", "> 3", "> 4", "> 5"],
    //default_index: 1
    default_index: 0
  },
  {
    name: "P/C",
    display_name: "P/C Ratio",
    tooltip: "Price to Cash per share (mrq)",
    args_items: ["Any", "< 1", "< 2", "< 3", "< 4", "< 5", "> 1", "> 2", "> 3", "> 4", "> 5"],
    //default_index: 3
    default_index: 0
  },
  {
    name: "P/FCF",
    display_name: "P/FCF",
    tooltip: "Price to Free Cash Flow (ttm)",
    args_items: ["Any", "< 5", "< 10", "< 15", "< 20", "< 25", "< 30", "< 40", "< 50", "> 5", "> 10", "> 15", "> 20", "> 25", "> 30", "> 40", "> 50"],
    //default_index: 3
    default_index: 0
  },
  {
    name: "Quick Ratio",
    display_name: "Quick Ratio",
    tooltip: "Quick Ratio (mrq)",
    args_items: ["Any", "< 0.5", "< 1", "< 1.5", "< 2", "< 3", "< 4", "< 5", "> 0.5", "> 1", "> 1.5", "> 2", "> 3", "> 4", "> 5"],
    //default_index: 11
    default_index: 0
  },
  {
    name: "Current Ratio",
    display_name: "Current Ratio",
    tooltip: "Current Ratio (mrq)",
    args_items: ["Any", "< 0.5", "< 1", "< 1.5", "< 2", "< 3", "< 4", "< 5", "> 0.5", "> 1", "> 1.5", "> 2", "> 3", "> 4", "> 5"],
    //default_index: 11
    default_index: 0
  },
  {
    name: "Debt/Eq",
    display_name: "Debt/Eq",
    tooltip: "Total Debt to Equity (mrq)",
    args_items: ["Any", "< 0.2", "< 0.4", "< 0.6", "< 0.8", "< 1", "< 1.2", "< 1.4", "< 1.6", "< 1.8", "< 2", "> 0.2", "> 0.4", "> 0.6", "> 0.8", "> 1", "> 1.2", "> 1.4", "> 1.6", "> 1.8", "> 2"],
    default_index: 3
  },
  {
    name: "LT Debt/Eq",
    display_name: "LT Debt/Eq",
    tooltip: "Long Term Debt to Equity (mrq)",
    args_items: ["Any", "< 0.2", "< 0.4", "< 0.6", "< 0.8", "< 1", "< 1.2", "< 1.4", "< 1.6", "< 1.8", "< 2", "> 0.2", "> 0.4", "> 0.6", "> 0.8", "> 1", "> 1.2", "> 1.4", "> 1.6", "> 1.8", "> 2"],
    default_index: 3
  },
  {
    name: "Insider Own",
    display_name: "Insider Own",
    tooltip: "Insider Ownership",
    args_items: ["Any", "> 5%", "> 10%", "> 15%", "> 20%", "> 25%", "> 30%", "< 5%", "< 10%", "< 15%", "< 20%", "< 25%", "< 30%"],
    //default_index: 1
    default_index: 0
  },
  {
    name: "Insider Trans",
    display_name: "Insider Trans",
    tooltip: "Insider transactions (6-month change in Insider Ownership)",
    args_items: ["Any", "> 5%", "> 10%", "> 15%", "> 20%", "> 25%", "> 30%", "< -5%", "< -10%", "< -15%", "< -20%", "< -25%", "< -30%"],
    //default_index: 1
    default_index: 0
  },
  {
    name: "Inst Own",
    display_name: "Inst Own",
    tooltip: "Institutional Ownership",
    args_items: ["Any", "> 5%", "> 10%", "> 15%", "> 20%", "> 25%", "> 30%", "< 5%", "< 10%", "< 15%", "< 20%", "< 25%", "< 30%"],
    //default_index: 1
    default_index: 0
  },
  {
    name: "Inst Trans",
    display_name: "Inst Trans",
    tooltip: "Institutional transactions (3-month change in Institutional Ownership)",
    args_items: ["Any", "> 5%", "> 10%", "> 15%", "> 20%", "> 25%", "> 30%", "< -5%", "< -10%", "< -15%", "< -20%", "< -25%", "< -30%"],
    //default_index: 1
    default_index: 0
  },
  {
    name: "Gross Margin",
    display_name: "Gross Margin",
    tooltip: "Gross Margin (ttm)",
    args_items: ["Any", "> 10%", "> 20%", "> 30%", "> 40%", "> 50%", "> 60%", "< -10%", "< -20%", "< -30%", "< -40%", "< -50%", "< -60%"],
    //default_index: 1
    default_index: 0
  },
  {
    name: "Oper. Margin",
    display_name: "Oper. Margin",
    tooltip: "Operating Margin (ttm)",
    args_items: ["Any", "> 10%", "> 20%", "> 30%", "> 40%", "> 50%", "> 60%", "< -10%", "< -20%", "< -30%", "< -40%", "< -50%", "< -60%"],
    //default_index: 1
    default_index: 0
  },
  {
    name: "Profit Margin",
    display_name: "Profit Margin",
    tooltip: "Net Profit Margin (ttm)",
    args_items: ["Any", "> 10%", "> 20%", "> 30%", "> 40%", "> 50%", "> 60%", "< -10%", "< -20%", "< -30%", "< -40%", "< -50%", "< -60%"],
    //default_index: 1
    default_index: 0
  },
  {
    name: "Payout",
    display_name: "Dividend Payout",
    tooltip: "Dividend Payout Ratio (ttm)",
    args_items: ["Any", "> 10%", "> 20%", "> 30%", "> 40%", "> 50%", "> 60%", "< 10%", "< 20%", "< 30%", "< 40%", "< 50%", "< 60%"],
    default_index: 0
  },
  {
    name: "Short Float",
    display_name: "Short Float",
    tooltip: "Short interest share",
    args_items: ["Any", "> 5%", "> 10%", "> 15%", "> 20%", "> 25%", "> 30%", "< 5%", "< 10%", "< 15%", "< 20%", "< 25%", "< 30%"],
    default_index: 0
  },
  {
    name: "Short Ratio",
    display_name: "Short Ratio",
    tooltip: "Short interest ratio",
    args_items: ["Any", "< 1", "< 2", "< 3", "< 4", "< 5", "< 6", "< 7", "> 1", "> 2", "> 3", "> 4", "> 5", "> 6", "> 7"],
    default_index: 0
  },
  {
    name: "52W High",
    display_name: "52W High",
    tooltip: "Distance from 52-Week High",
    args_items: ["Any", "< -5%", "< -10%", "< -15%", "< -20%", "< -25%", "< -30%", "< -35%", "< -40%", "< -45%", "< -50%", "< -55%", "< -60%"],
    default_index: 0
  },
  {
    name: "52W Low",
    display_name: "52W Low",
    tooltip: "Distance from 52-Week Low",
    args_items: ["Any", "> 5%", "> 10%", "> 15%", "> 20%", "> 25%", "> 30%", "> 35%", "> 40%", "> 45%", "> 50%", "> 55%", "> 60%"],
    default_index: 0
  },
  {
    name: "RSI (14)",
    display_name: "RSI (14)",
    tooltip: "Relative Strength Index",
    args_items: ["Any", "< 10", "< 20", "< 30", "< 40", "< 50", "< 60", "< 70", "< 80", "< 90", "> 10", "> 20", "> 30", "> 40", "> 50", "> 60", "> 70", "> 80", "> 90"],
    //default_index: 3
    default_index: 0
  },
  {
    name: "Perf Week",
    display_name: "Perf Week",
    tooltip: "Performance (Week)",
    args_items: ["Any", "> 0%", "> 5%", "> 10%", "> 15%", "> 20%", "> 25%", "> 30%", "< 0%", "< -5%", "< -10%", "< -15%", "< -20%", "< -25%", "< -30%"],
    default_index: 0
  },
  {
    name: "Perf Month",
    display_name: "Perf Month",
    tooltip: "Performance (Month)",
    args_items: ["Any", "> 0%", "> 10%", "> 20%", "> 30%", "> 40%", "> 50%", "> 60%", "< 0%", "< -10%", "< -20%", "< -30%", "< -40%", "< -50%", "< -60%"],
    default_index: 0
  },
  {
    name: "Perf Quarter",
    display_name: "Perf Quarter",
    tooltip: "Performance (Quarter)",
    args_items: ["Any", "> 0%", "> 10%", "> 20%", "> 30%", "> 40%", "> 50%", "> 60%", "< 0%", "< -10%", "< -20%", "< -30%", "< -40%", "< -50%", "< -60%"],
    default_index: 0
  },
  {
    name: "Perf Half Y",
    display_name: "Perf Half Y",
    tooltip: "Performance (Half Year)",
    args_items: ["Any", "> 0%", "> 20%", "> 40%", "> 60%", "> 80%", "> 100%", "> 120%", "< 0%", "< -10%", "< -20%", "< -30%", "< -40%", "< -50%", "< -60%"],
    default_index: 0
  },
  {
    name: "Perf Year",
    display_name: "Perf Year",
    tooltip: "Performance (Year)",
    args_items: ["Any", "> 0%", "> 20%", "> 40%", "> 60%", "> 100%", "> 200%", "> 300%", "< 0%", "< -10%", "< -20%", "< -30%", "< -40%", "< -50%", "< -60%"],
    default_index: 0
  },
  {
    name: "Perf YTD",
    display_name: "Perf YTD",
    tooltip: "Performance (Year To Date)",
    args_items: ["Any", "> 0%", "> 20%", "> 40%", "> 60%", "> 80%", "> 100%", "> 120%", "< 0%", "< -10%", "< -20%", "< -30%", "< -40%", "< -50%", "< -60%"],
    default_index: 0
  },
  {
    name: "Beta",
    display_name: "Beta",
    tooltip: "Beta",
    args_items: ["Any", "< 0.5", "< 1", "< 1.5", "< 2", "< 3", "< 4", "< 5", "> 0.5", "> 1", "> 1.5", "> 2", "> 3", "> 4", "> 5"],
    default_index: 2
  },
  {
    name: "ATR",
    display_name: "ATR",
    tooltip: "Average True Range",
    args_items: ["Any", "< 0.5", "< 1", "< 1.5", "< 2", "< 3", "< 4", "< 5", "> 0.5", "> 1", "> 1.5", "> 2", "> 3", "> 4", "> 5"],
    default_index: 0
  },
  {
    name: "SMA20",
    display_name: "SMA20",
    tooltip: "Distance from 20-Day Simple Moving Average",
    args_items: ["Any", "> 0%", "> 10%", "> 20%", "> 30%", "> 40%", "> 50%", "> 60%", "< 0%", "< -10%", "< -20%", "< -30%", "< -40%", "< -50%", "< -60%"],
    default_index: 0
  },
  {
    name: "SMA50",
    display_name: "SMA50",
    tooltip: "Distance from 50-Day Simple Moving Average",
    args_items: ["Any", "> 0%", "> 10%", "> 20%", "> 30%", "> 40%", "> 50%", "> 60%", "< 0%", "< -10%", "< -20%", "< -30%", "< -40%", "< -50%", "< -60%"],
    default_index: 0
  },
  {
    name: "SMA200",
    display_name: "SMA200",
    tooltip: "Distance from 200-Day Simple Moving Average",
    args_items: ["Any", "> 0%", "> 10%", "> 20%", "> 30%", "> 40%", "> 50%", "> 60%", "> 70%", "> 80%", "> 90%", "< 0%", "< -10%", "< -20%", "< -30%", "< -40%", "< -50%", "< -60%", "< -70%", "< -80%", "< -90%"],
    default_index: 0
  },
]