import React, { useState } from "react";

const JsonTreeItem = ({ name, value, children, path }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="json-reader-tree">
      <div>
        <div>
          <div className="json-reader-tree-property">
            <div className="flex gap-3">
              {children && (
                <div
                  className="json-reader-tree-property-arrow"
                  onClick={toggleCollapsed}
                >
                  {collapsed ? "▶" : "▼"}
                </div>
              )}

              <div>{name}: </div>

              <div className="json-reader-tree-property-path">
                {path}.{name}
              </div>
            </div>
          </div>
        </div>
        {collapsed ? null : (
          <div className="pl-[40px] json-reader-tree json-reader-tree-subtree">
            {React.Children.map(children, (child) =>
              React.cloneElement(child, { path: `${path}.${name}` })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const JsonTree = ({ data }) => {
  const renderTree = (obj, path = "$") => {
    return Object.entries(obj).map(([key, value]) => {
      const newPath = `${path}.${key}`;
      if (typeof value === "object" && value !== null) {
        return (
          <JsonTreeItem key={newPath} name={key} value="" path={path}>
            {renderTree(value, newPath)}
          </JsonTreeItem>
        );
      } else {
        return (
          <JsonTreeItem key={newPath} name={key} value={value} path={newPath} />
        );
      }
    });
  };

  return <div>{renderTree(data)}</div>;
};

// Example JSON data
const jsonData = {
  referenceId: "string",
  customerId: "string",
  metadata: {
    additionalProp1: "string",
    additionalProp2: "string",
    additionalProp3: "string",
  },
  updateRequestContext: {
    updateType: "PREPAYMENT",
    updateParam: "EMI",
    updateDate: "2023-08-31",
    prepaidAmount: 0,
    trancheAmount: 0,
    newInterestInPercent: 0,
    lenderNewInterestRateInPercent: 0,
    showPrepaymentRowInRS: true,
    prepaidInterestZero: true,
  },
  calculationInput: {
    sanctionAmount: 0,
    disbursementAmount: 0,
    interestRate: 0,
    interestRateFrequency: "PA",
    tenure: 0,
    monthlyDayCount: "ACTUAL",
    yearlyDayCount: "ACTUAL",
    disbursementDate: "2023-08-31",
    emiStartDate: "2023-08-31",
    interestStartDate: "2023-08-31",
    paymentFrequency: "DAILY",
    bpiHandling: "FIRST_INSTALLMENT",
    moratoriumStartDate: "2023-08-31",
    moratoriumEndDate: "2023-08-31",
    moratoriumType: "FREE",
    emiCalculationBaseType: "BASED_ON_SANCTIONED_AMOUNT",
    emiRoundingRequest: {
      precision: 0,
      roundingLogic: "ROUND_UP",
    },
    interestRoundingRequest: {
      precision: 0,
      roundingLogic: "ROUND_UP",
    },
    principalRoundingRequest: {
      precision: 0,
      roundingLogic: "ROUND_UP",
    },
    monthlyDayCountBPI: "ACTUAL",
    yearlyDayCountBPI: "ACTUAL",
    emiFormula: "PMT",
    dayCountConvention: "US",
  },
  repaymentType: "EQUATED_EMI",
  splitIn: {
    additionalProp1: {
      splitPercentage: 0,
      calculationInput: {
        sanctionAmount: 0,
        disbursementAmount: 0,
        interestRate: 0,
        interestRateFrequency: "PA",
        tenure: 0,
        monthlyDayCount: "ACTUAL",
        yearlyDayCount: "ACTUAL",
        disbursementDate: "2023-08-31",
        emiStartDate: "2023-08-31",
        interestStartDate: "2023-08-31",
        paymentFrequency: "DAILY",
        bpiHandling: "FIRST_INSTALLMENT",
        moratoriumStartDate: "2023-08-31",
        moratoriumEndDate: "2023-08-31",
        moratoriumType: "FREE",
        emiCalculationBaseType: "BASED_ON_SANCTIONED_AMOUNT",
        emiRoundingRequest: {
          precision: 0,
          roundingLogic: "ROUND_UP",
        },
        interestRoundingRequest: {
          precision: 0,
          roundingLogic: "ROUND_UP",
        },
        principalRoundingRequest: {
          precision: 0,
          roundingLogic: "ROUND_UP",
        },
        monthlyDayCountBPI: "ACTUAL",
        yearlyDayCountBPI: "ACTUAL",
        emiFormula: "PMT",
        dayCountConvention: "US",
      },
    },
    additionalProp2: {
      splitPercentage: 0,
      calculationInput: {
        sanctionAmount: 0,
        disbursementAmount: 0,
        interestRate: 0,
        interestRateFrequency: "PA",
        tenure: 0,
        monthlyDayCount: "ACTUAL",
        yearlyDayCount: "ACTUAL",
        disbursementDate: "2023-08-31",
        emiStartDate: "2023-08-31",
        interestStartDate: "2023-08-31",
        paymentFrequency: "DAILY",
        bpiHandling: "FIRST_INSTALLMENT",
        moratoriumStartDate: "2023-08-31",
        moratoriumEndDate: "2023-08-31",
        moratoriumType: "FREE",
        emiCalculationBaseType: "BASED_ON_SANCTIONED_AMOUNT",
        emiRoundingRequest: {
          precision: 0,
          roundingLogic: "ROUND_UP",
        },
        interestRoundingRequest: {
          precision: 0,
          roundingLogic: "ROUND_UP",
        },
        principalRoundingRequest: {
          precision: 0,
          roundingLogic: "ROUND_UP",
        },
        monthlyDayCountBPI: "ACTUAL",
        yearlyDayCountBPI: "ACTUAL",
        emiFormula: "PMT",
        dayCountConvention: "US",
      },
    },
    additionalProp3: {
      splitPercentage: 0,
      calculationInput: {
        sanctionAmount: 0,
        disbursementAmount: 0,
        interestRate: 0,
        interestRateFrequency: "PA",
        tenure: 0,
        monthlyDayCount: "ACTUAL",
        yearlyDayCount: "ACTUAL",
        disbursementDate: "2023-08-31",
        emiStartDate: "2023-08-31",
        interestStartDate: "2023-08-31",
        paymentFrequency: "DAILY",
        bpiHandling: "FIRST_INSTALLMENT",
        moratoriumStartDate: "2023-08-31",
        moratoriumEndDate: "2023-08-31",
        moratoriumType: "FREE",
        emiCalculationBaseType: "BASED_ON_SANCTIONED_AMOUNT",
        emiRoundingRequest: {
          precision: 0,
          roundingLogic: "ROUND_UP",
        },
        interestRoundingRequest: {
          precision: 0,
          roundingLogic: "ROUND_UP",
        },
        principalRoundingRequest: {
          precision: 0,
          roundingLogic: "ROUND_UP",
        },
        monthlyDayCountBPI: "ACTUAL",
        yearlyDayCountBPI: "ACTUAL",
        emiFormula: "PMT",
        dayCountConvention: "US",
      },
    },
  },
  splitType: "EQUATED_INTEREST",
  borrowerInput: {
    calculateUpdateRS: true,
    emiScheduleList: [
      {
        installmentNo: 0,
        installmentDate: "2023-08-31",
        openingBalance: 0,
        interest: 0,
        principal: 0,
        closingBalance: 0,
        investorEmiRatio: 0,
        emi: 0,
      },
    ],
  },
  lenderInput: {
    calculateUpdateRS: true,
    emiScheduleList: [
      {
        installmentNo: 0,
        installmentDate: "2023-08-31",
        openingBalance: 0,
        interest: 0,
        principal: 0,
        closingBalance: 0,
        investorEmiRatio: 0,
        emi: 0,
      },
    ],
  },
  originatorInput: {
    calculateUpdateRS: true,
    emiScheduleList: [
      {
        installmentNo: 0,
        installmentDate: "2023-08-31",
        openingBalance: 0,
        interest: 0,
        principal: 0,
        closingBalance: 0,
        investorEmiRatio: 0,
        emi: 0,
      },
    ],
  },
  pariPassuRatio: true,
  truncationRequest: {
    truncateEMIDate: "2023-08-31",
    isTruncationNeeded: true,
  },
};

// Render the JsonTree component with the example data
function JsonTreeComponent() {
  return (
    <div>
      <JsonTree data={jsonData} />
    </div>
  );
}

export default JsonTreeComponent;
