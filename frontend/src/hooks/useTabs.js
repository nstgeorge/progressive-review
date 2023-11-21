import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

/**
 * Handles URL updates and human-readable tab names for tabs.
 * @param {string} baseUrl The URL up to the active page. For instance, `org/1/system/1`
 * @param {array} tabNames Array of strings containing each page name in order.
 * @returns `[tab, setTab]` to be used like a `useState` hook.
 */

const useTabs = (baseUrl, param, tabNames) => {
  const params = useParams()
  const navigate = useNavigate()
  const [tab, _setTab] = useState(params[param] ? (isNaN(parseInt(params[param])) ? Math.max(tabNames.indexOf(params[param]), 0) : params[param]) : 0)

  // Update URL with default tabName
  useEffect(() => {
    navigate(`${baseUrl}/${tabNames[tab]}`)
  }, [])

  const setTab = (newTab) => {
    if (!tabNames.includes(newTab) && newTab >= tabNames.length) {
      throw new Error(`Tab ${newTab} is not defined in this page's tabs (${tabNames})`)
    } else {
      _setTab(tabNames.indexOf(newTab))
      navigate(`${baseUrl}/${newTab}`)
    }
  }

  return [tab, setTab]
}

export default useTabs