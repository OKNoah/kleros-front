import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { balanceFetchData } from '../business/ethereum/action-creators'
import DisputesTable from '../DisputesTable'
import SearchBar from '../SearchBar'
import './Disputes.css'

class Disputes extends Component {
  state = {
    address: 0x0
  }

  componentWillMount () {
    this.props.getBalance()
  }

  render () {
    const itemsTitle = [
      'Project',
      'Deadline',
      'Case ID',
      'Status',
      'Evidence'
    ]

    const filterFunction = disputes => _.filter(disputes, dispute => (
      ((dispute.disputeData.isJuror && !dispute.disputeData.hasRuled) && dispute))
    )

    return (
      <div className='Disputes-container'>
        <SearchBar />
        <div className='content'>
          <h1>Open Disputes</h1>
          <DisputesTable itemTitles={itemsTitle} baseLink={'disputes'} filterFunction={filterFunction} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBalance: url => dispatch(balanceFetchData())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Disputes))
