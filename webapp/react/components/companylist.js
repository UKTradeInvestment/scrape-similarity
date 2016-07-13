import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getCompanies, setCurrentCompany, setCurrentOpportunity } from '../actions';

class CompanyList extends Component {

  componentWillMount() {
    this.props.getCompanies();
  }

  render() {
    const companies = this.props.companies.all;

    if (companies.length === 0) {
      return (<div>...Loading</div>);
    }

    let companiesList = companies.map((company, index) => {
      return (
        <li className="results-list__result" key={index}>
          <a onClick={() => this.props.setCurrentCompany(company)}>{ company.name }</a></li>
      );
    });

    let oppList  = this.props.opportunities.all.map((opportunity, key) => {
      return (
        <div className="opportunity" onClick={() => this.props.setCurrentOpportunity(opportunity)}>
          {opportunity.title}
        </div>
      );
    });

    return (
      <div>
        <div className="col">
          <ol className="company-list">{ companiesList }</ol>
        </div>
        <div className="col">
          { this.props.companies.currentCompany &&
            <div className="current-company">
              <h3 className="heading-medium">{ this.props.companies.currentCompany.name }</h3>
              <p>{ this.props.companies.currentCompany.desc }</p>
            </div>
          }

          <div className="opportunities">{ oppList }</div>
        </div>
        <div className="col">

        </div>
      </div>
    );
  }

}

function mapStateToProps({ companies, opportunities }) {
  return { companies, opportunities };
}

export default connect(mapStateToProps, { getCompanies, setCurrentCompany, setCurrentOpportunity })(CompanyList);
