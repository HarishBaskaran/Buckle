"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
global["webpackHotUpdate_N_E"]("pages/home",{

/***/ "./pages/hb_app/1_body/6_TestSummary/summary/responseContent.js":
/*!**********************************************************************!*\
  !*** ./pages/hb_app/1_body/6_TestSummary/summary/responseContent.js ***!
  \**********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_src_async_to_generator_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swc/helpers/src/_async_to_generator.mjs */ \"../node_modules/next/node_modules/@swc/helpers/src/_async_to_generator.mjs\");\n/* harmony import */ var _swc_helpers_src_ts_generator_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swc/helpers/src/_ts_generator.mjs */ \"../node_modules/next/node_modules/@swc/helpers/src/_ts_generator.mjs\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"../node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _hb_components_popup1__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../hb_components/popup1 */ \"./pages/hb_components/popup1.js\");\n/* harmony import */ var _hb_components_textarea__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../hb_components/textarea */ \"./pages/hb_components/textarea.js\");\n\n\nvar _this = undefined;\n\nvar _s = $RefreshSig$();\n\n\n\nvar ResponseContent = function(param) {\n    var value = param.value, onResponseChange = param.onResponseChange;\n    _s();\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false), popupFlag = ref[0], setPopupFlag = ref[1];\n    var ref1 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(value), responseValue = ref1[0], setResponseValue = ref1[1];\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function() {\n        console.log(value);\n        setResponseValue(value);\n    }, []);\n    var handleResponseChange = function(event) {\n        var newValue = event.target.value;\n        setResponseValue(newValue);\n        onResponseChange(newValue);\n    };\n    var handlePopupSave = function() {\n        var _ref = (0,_swc_helpers_src_async_to_generator_mjs__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(function() {\n            return (0,_swc_helpers_src_ts_generator_mjs__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(this, function(_state) {\n                setPopupFlag(false);\n                return [\n                    2\n                ];\n            });\n        });\n        return function handlePopupSave() {\n            return _ref.apply(this, arguments);\n        };\n    }();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_hb_components_popup1__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n        // logo={faFilePen}\n        buttonLabel: \"content\",\n        logoClassName: \" pr-[10px]\",\n        flag: popupFlag,\n        open: function() {\n            return setPopupFlag(true);\n        },\n        close: function() {\n            return setPopupFlag(false);\n        },\n        save: function() {\n            handlePopupSave();\n        },\n        height: \"h-[400px]\",\n        width: \"w-[45%]\",\n        header: \"Validation Details\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"flex flex-col gap-2 justify-between\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                    className: \"mt-[5px] text-gray-500\",\n                    children: \"Response Content\"\n                }, void 0, false, {\n                    fileName: \"/Users/harish.baskaran/Documents/Work/Automation/smart-api-nextron/renderer/pages/hb_app/1_body/6_TestSummary/summary/responseContent.js\",\n                    lineNumber: 40,\n                    columnNumber: 9\n                }, _this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_hb_components_textarea__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                    className: \"w-[500px] max-h-[200px] overflow-y-auto\",\n                    value: responseValue,\n                    setValue: function() {\n                        return setResponseValue();\n                    },\n                    onChange: function() {\n                        return handleResponseChange();\n                    }\n                }, void 0, false, {\n                    fileName: \"/Users/harish.baskaran/Documents/Work/Automation/smart-api-nextron/renderer/pages/hb_app/1_body/6_TestSummary/summary/responseContent.js\",\n                    lineNumber: 41,\n                    columnNumber: 9\n                }, _this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/harish.baskaran/Documents/Work/Automation/smart-api-nextron/renderer/pages/hb_app/1_body/6_TestSummary/summary/responseContent.js\",\n            lineNumber: 39,\n            columnNumber: 7\n        }, _this)\n    }, void 0, false, {\n        fileName: \"/Users/harish.baskaran/Documents/Work/Automation/smart-api-nextron/renderer/pages/hb_app/1_body/6_TestSummary/summary/responseContent.js\",\n        lineNumber: 25,\n        columnNumber: 5\n    }, _this);\n};\n_s(ResponseContent, \"VIyR5t5JMoutndX0rBmZgEISL1Q=\");\n_c = ResponseContent;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ResponseContent);\nvar _c;\n$RefreshReg$(_c, \"ResponseContent\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9oYl9hcHAvMV9ib2R5LzZfVGVzdFN1bW1hcnkvc3VtbWFyeS9yZXNwb25zZUNvbnRlbnQuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7O0FBQXVFO0FBQ2I7QUFDQTtBQUUxRCxJQUFNTyxlQUFlLEdBQUcsZ0JBQWlDO1FBQTlCQyxLQUFLLFNBQUxBLEtBQUssRUFBRUMsZ0JBQWdCLFNBQWhCQSxnQkFBZ0I7O0lBQ2hELElBQWtDUCxHQUFlLEdBQWZBLCtDQUFRLENBQUMsS0FBSyxDQUFDLEVBQTFDUSxTQUFTLEdBQWtCUixHQUFlLEdBQWpDLEVBQUVTLFlBQVksR0FBSVQsR0FBZSxHQUFuQjtJQUM5QixJQUEwQ0EsSUFBZSxHQUFmQSwrQ0FBUSxDQUFDTSxLQUFLLENBQUMsRUFBbERJLGFBQWEsR0FBc0JWLElBQWUsR0FBckMsRUFBRVcsZ0JBQWdCLEdBQUlYLElBQWUsR0FBbkI7SUFFdENELGdEQUFTLENBQUMsV0FBTTtRQUNkYSxPQUFPLENBQUNDLEdBQUcsQ0FBQ1AsS0FBSyxDQUFDLENBQUM7UUFDbkJLLGdCQUFnQixDQUFDTCxLQUFLLENBQUMsQ0FBQztJQUMxQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFUCxJQUFNUSxvQkFBb0IsR0FBRyxTQUFDQyxLQUFLLEVBQUs7UUFDdEMsSUFBTUMsUUFBUSxHQUFHRCxLQUFLLENBQUNFLE1BQU0sQ0FBQ1gsS0FBSztRQUNuQ0ssZ0JBQWdCLENBQUNLLFFBQVEsQ0FBQyxDQUFDO1FBQzNCVCxnQkFBZ0IsQ0FBQ1MsUUFBUSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQU1FLGVBQWU7bUJBQUcsK0ZBQVk7O2dCQUNsQ1QsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7OztRQUN0QixDQUFDO3dCQUZLUyxlQUFlOzs7T0FFcEI7SUFFRCxxQkFDRSw4REFBQ2YsNkRBQVU7UUFDVCxtQkFBbUI7UUFDbkJnQixXQUFXLEVBQUMsU0FBUztRQUNyQkMsYUFBYSxFQUFDLFlBQVk7UUFDMUJDLElBQUksRUFBRWIsU0FBUztRQUNmYyxJQUFJLEVBQUU7bUJBQU1iLFlBQVksQ0FBQyxJQUFJLENBQUM7U0FBQTtRQUM5QmMsS0FBSyxFQUFFO21CQUFNZCxZQUFZLENBQUMsS0FBSyxDQUFDO1NBQUE7UUFDaENlLElBQUksRUFBRSxXQUFNO1lBQ1ZOLGVBQWUsRUFBRSxDQUFDO1FBQ3BCLENBQUM7UUFDRE8sTUFBTSxFQUFDLFdBQVc7UUFDbEJDLEtBQUssRUFBQyxTQUFTO1FBQ2ZDLE1BQU0sRUFBQyxvQkFBb0I7a0JBRTNCLDRFQUFDQyxLQUFHO1lBQUNDLFNBQVMsRUFBQyxxQ0FBcUM7OzhCQUNsRCw4REFBQ0MsR0FBQztvQkFBQ0QsU0FBUyxFQUFDLHdCQUF3Qjs4QkFBQyxrQkFBZ0I7Ozs7O3lCQUFJOzhCQUMxRCw4REFBQ3pCLCtEQUFRO29CQUNQeUIsU0FBUyxFQUFDLHlDQUF5QztvQkFDbkR2QixLQUFLLEVBQUVJLGFBQWE7b0JBQ3BCcUIsUUFBUSxFQUFFOytCQUFNcEIsZ0JBQWdCLEVBQUU7cUJBQUE7b0JBQ2xDcUIsUUFBUSxFQUFFOytCQUFNbEIsb0JBQW9CLEVBQUU7cUJBQUE7Ozs7O3lCQUN0Qzs7Ozs7O2lCQUNFOzs7OzthQUNLLENBQ2I7QUFDSixDQUFDO0dBN0NLVCxlQUFlO0FBQWZBLEtBQUFBLGVBQWU7QUErQ3JCLGlFQUFlQSxlQUFlLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvaGJfYXBwLzFfYm9keS82X1Rlc3RTdW1tYXJ5L3N1bW1hcnkvcmVzcG9uc2VDb250ZW50LmpzP2NhYmEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUsIHVzZUNvbnRleHQsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFBvcHVwTW9kYWwgZnJvbSBcIi4uLy4uLy4uLy4uL2hiX2NvbXBvbmVudHMvcG9wdXAxXCI7XG5pbXBvcnQgVGV4dEFyZWEgZnJvbSBcIi4uLy4uLy4uLy4uL2hiX2NvbXBvbmVudHMvdGV4dGFyZWFcIjtcblxuY29uc3QgUmVzcG9uc2VDb250ZW50ID0gKHsgdmFsdWUsIG9uUmVzcG9uc2VDaGFuZ2UgfSkgPT4ge1xuICBjb25zdCBbcG9wdXBGbGFnLCBzZXRQb3B1cEZsYWddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcmVzcG9uc2VWYWx1ZSwgc2V0UmVzcG9uc2VWYWx1ZV0gPSB1c2VTdGF0ZSh2YWx1ZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zb2xlLmxvZyh2YWx1ZSk7XG4gICAgc2V0UmVzcG9uc2VWYWx1ZSh2YWx1ZSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVSZXNwb25zZUNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IG5ld1ZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHNldFJlc3BvbnNlVmFsdWUobmV3VmFsdWUpO1xuICAgIG9uUmVzcG9uc2VDaGFuZ2UobmV3VmFsdWUpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVBvcHVwU2F2ZSA9IGFzeW5jICgpID0+IHtcbiAgICBzZXRQb3B1cEZsYWcoZmFsc2UpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPFBvcHVwTW9kYWxcbiAgICAgIC8vIGxvZ289e2ZhRmlsZVBlbn1cbiAgICAgIGJ1dHRvbkxhYmVsPVwiY29udGVudFwiXG4gICAgICBsb2dvQ2xhc3NOYW1lPVwiIHByLVsxMHB4XVwiXG4gICAgICBmbGFnPXtwb3B1cEZsYWd9XG4gICAgICBvcGVuPXsoKSA9PiBzZXRQb3B1cEZsYWcodHJ1ZSl9XG4gICAgICBjbG9zZT17KCkgPT4gc2V0UG9wdXBGbGFnKGZhbHNlKX1cbiAgICAgIHNhdmU9eygpID0+IHtcbiAgICAgICAgaGFuZGxlUG9wdXBTYXZlKCk7XG4gICAgICB9fVxuICAgICAgaGVpZ2h0PVwiaC1bNDAwcHhdXCJcbiAgICAgIHdpZHRoPVwidy1bNDUlXVwiXG4gICAgICBoZWFkZXI9XCJWYWxpZGF0aW9uIERldGFpbHNcIlxuICAgID5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMiBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtWzVweF0gdGV4dC1ncmF5LTUwMFwiPlJlc3BvbnNlIENvbnRlbnQ8L3A+XG4gICAgICAgIDxUZXh0QXJlYVxuICAgICAgICAgIGNsYXNzTmFtZT1cInctWzUwMHB4XSBtYXgtaC1bMjAwcHhdIG92ZXJmbG93LXktYXV0b1wiXG4gICAgICAgICAgdmFsdWU9e3Jlc3BvbnNlVmFsdWV9XG4gICAgICAgICAgc2V0VmFsdWU9eygpID0+IHNldFJlc3BvbnNlVmFsdWUoKX1cbiAgICAgICAgICBvbkNoYW5nZT17KCkgPT4gaGFuZGxlUmVzcG9uc2VDaGFuZ2UoKX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvUG9wdXBNb2RhbD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJlc3BvbnNlQ29udGVudDtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwidXNlQ29udGV4dCIsInVzZVJlZiIsIlBvcHVwTW9kYWwiLCJUZXh0QXJlYSIsIlJlc3BvbnNlQ29udGVudCIsInZhbHVlIiwib25SZXNwb25zZUNoYW5nZSIsInBvcHVwRmxhZyIsInNldFBvcHVwRmxhZyIsInJlc3BvbnNlVmFsdWUiLCJzZXRSZXNwb25zZVZhbHVlIiwiY29uc29sZSIsImxvZyIsImhhbmRsZVJlc3BvbnNlQ2hhbmdlIiwiZXZlbnQiLCJuZXdWYWx1ZSIsInRhcmdldCIsImhhbmRsZVBvcHVwU2F2ZSIsImJ1dHRvbkxhYmVsIiwibG9nb0NsYXNzTmFtZSIsImZsYWciLCJvcGVuIiwiY2xvc2UiLCJzYXZlIiwiaGVpZ2h0Iiwid2lkdGgiLCJoZWFkZXIiLCJkaXYiLCJjbGFzc05hbWUiLCJwIiwic2V0VmFsdWUiLCJvbkNoYW5nZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/hb_app/1_body/6_TestSummary/summary/responseContent.js\n"));

/***/ })

});