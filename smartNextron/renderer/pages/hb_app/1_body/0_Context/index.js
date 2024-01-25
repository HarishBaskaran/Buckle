import ExportImportContextProvider from "./0_ExportImport";
import TestResultContextProvider from "./10_TestRunner";
import HttpMethodContextProvider from "./1_HttpMethod";
import UrlContextProvider from "./2_Url";
import ParamsContextProvider from "./3_Params";
import HeadersContextProvider from "./4_Headers";
import JSONBodyContextProvider from "./5_JsonBody";
import TestDataContextProvider from "./6_TestDataConfig";
import SingleCustomTestDataContextProvider from "./7B_SingleCustomTestDataConfig";
import MultiCustomTestDataContextProvider from "./7B_MultiCustomTestDataConfig";
import ImportExportTestDataContextProvider from "./8_ImportExportTestData";
import TestSummaryContextProvider from "./9_TestSummary";
import DefaultCustomTestDataContextProvider from "./7_DefaultCustomTestDataConfig";
import QueryTestDataContextProvider from "./6_QueryTestDataConfig";
import SingleQueryCustomTestDataContextProvider from "./7A_SingleQueryCustomTestDataConfig";
import MultiQueryCustomTestDataContextProvider from "./7A_MultiQueryCustomTestDataConfig";
import TestQuerySummaryContextProvider from "./9_TestQuerySummary";
import CollectionsContextProvider from "./11_SideBarCollections";
import PreRequestContextProvider from "./12_PreRequest";

const ContextProvider = ({ children }) => {
  // Return the provider with the values
  return (
    <>
      <PreRequestContextProvider>
        <CollectionsContextProvider>
          <ExportImportContextProvider>
            <HttpMethodContextProvider>
              <UrlContextProvider>
                <ParamsContextProvider>
                  <HeadersContextProvider>
                    <JSONBodyContextProvider>
                      <TestDataContextProvider>
                        <QueryTestDataContextProvider>
                          <DefaultCustomTestDataContextProvider>
                            <SingleQueryCustomTestDataContextProvider>
                              <MultiQueryCustomTestDataContextProvider>
                                <SingleCustomTestDataContextProvider>
                                  <MultiCustomTestDataContextProvider>
                                    <ImportExportTestDataContextProvider>
                                      <TestQuerySummaryContextProvider>
                                        <TestSummaryContextProvider>
                                          <TestResultContextProvider>
                                            {children}
                                          </TestResultContextProvider>
                                        </TestSummaryContextProvider>
                                      </TestQuerySummaryContextProvider>
                                    </ImportExportTestDataContextProvider>
                                  </MultiCustomTestDataContextProvider>
                                </SingleCustomTestDataContextProvider>
                              </MultiQueryCustomTestDataContextProvider>
                            </SingleQueryCustomTestDataContextProvider>
                          </DefaultCustomTestDataContextProvider>
                        </QueryTestDataContextProvider>
                      </TestDataContextProvider>
                    </JSONBodyContextProvider>
                  </HeadersContextProvider>
                </ParamsContextProvider>
              </UrlContextProvider>
            </HttpMethodContextProvider>
          </ExportImportContextProvider>
        </CollectionsContextProvider>
      </PreRequestContextProvider>
    </>
  );
};

export default ContextProvider;
