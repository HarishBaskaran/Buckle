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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_src_async_to_generator_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swc/helpers/src/_async_to_generator.mjs */ \"../node_modules/next/node_modules/@swc/helpers/src/_async_to_generator.mjs\");\n/* harmony import */ var _swc_helpers_src_ts_generator_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swc/helpers/src/_ts_generator.mjs */ \"../node_modules/next/node_modules/@swc/helpers/src/_ts_generator.mjs\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"../node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _hb_components_popup1__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../hb_components/popup1 */ \"./pages/hb_components/popup1.js\");\n/* harmony import */ var _hb_components_textarea__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../hb_components/textarea */ \"./pages/hb_components/textarea.js\");\n\n\nvar _this = undefined;\n\nvar _s = $RefreshSig$();\n\n\n\nvar ResponseContent = function(param) {\n    var value = param.value, onResponseChange = param.onResponseChange;\n    _s();\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false), popupFlag = ref[0], setPopupFlag = ref[1];\n    var ref1 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\"), responseValue = ref1[0], setResponseValue = ref1[1];\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function() {\n        console.log(value);\n        setResponseValue(value);\n    }, []);\n    var handleResponseChange = function(event) {\n        var newValue = event.target.value;\n        setResponseValue(newValue);\n        onResponseChange(newValue);\n    };\n    var handlePopupSave = function() {\n        var _ref = (0,_swc_helpers_src_async_to_generator_mjs__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(function() {\n            return (0,_swc_helpers_src_ts_generator_mjs__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(this, function(_state) {\n                setPopupFlag(false);\n                return [\n                    2\n                ];\n            });\n        });\n        return function handlePopupSave() {\n            return _ref.apply(this, arguments);\n        };\n    }();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_hb_components_popup1__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n        // logo={faFilePen}\n        buttonLabel: \"content\",\n        logoClassName: \" pr-[10px]\",\n        flag: popupFlag,\n        open: function() {\n            return setPopupFlag(true);\n        },\n        close: function() {\n            return setPopupFlag(false);\n        },\n        save: function() {\n            handlePopupSave();\n        },\n        height: \"h-[400px]\",\n        width: \"w-[45%]\",\n        header: \"Validation Details\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"flex flex-col gap-2 justify-between\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                    className: \"mt-[5px] text-gray-500\",\n                    children: \"Response Content\"\n                }, void 0, false, {\n                    fileName: \"/Users/harish.baskaran/Documents/Work/Automation/smart-api-nextron/renderer/pages/hb_app/1_body/6_TestSummary/summary/responseContent.js\",\n                    lineNumber: 40,\n                    columnNumber: 9\n                }, _this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_hb_components_textarea__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                    className: \"w-[500px] max-h-[200px] overflow-y-auto\",\n                    value: responseValue,\n                    setValue: setResponseValue,\n                    onChange: handleResponseChange\n                }, void 0, false, {\n                    fileName: \"/Users/harish.baskaran/Documents/Work/Automation/smart-api-nextron/renderer/pages/hb_app/1_body/6_TestSummary/summary/responseContent.js\",\n                    lineNumber: 41,\n                    columnNumber: 9\n                }, _this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/harish.baskaran/Documents/Work/Automation/smart-api-nextron/renderer/pages/hb_app/1_body/6_TestSummary/summary/responseContent.js\",\n            lineNumber: 39,\n            columnNumber: 7\n        }, _this)\n    }, void 0, false, {\n        fileName: \"/Users/harish.baskaran/Documents/Work/Automation/smart-api-nextron/renderer/pages/hb_app/1_body/6_TestSummary/summary/responseContent.js\",\n        lineNumber: 25,\n        columnNumber: 5\n    }, _this);\n};\n_s(ResponseContent, \"x/Q10vgp1oTQWmdpAvsrvZM5yEc=\");\n_c = ResponseContent;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ResponseContent);\nvar _c;\n$RefreshReg$(_c, \"ResponseContent\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9oYl9hcHAvMV9ib2R5LzZfVGVzdFN1bW1hcnkvc3VtbWFyeS9yZXNwb25zZUNvbnRlbnQuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7O0FBQXVFO0FBQ2I7QUFDQTtBQUUxRCxJQUFNTyxlQUFlLEdBQUcsZ0JBQWlDO1FBQTlCQyxLQUFLLFNBQUxBLEtBQUssRUFBRUMsZ0JBQWdCLFNBQWhCQSxnQkFBZ0I7O0lBQ2hELElBQWtDUCxHQUFlLEdBQWZBLCtDQUFRLENBQUMsS0FBSyxDQUFDLEVBQTFDUSxTQUFTLEdBQWtCUixHQUFlLEdBQWpDLEVBQUVTLFlBQVksR0FBSVQsR0FBZSxHQUFuQjtJQUM5QixJQUEwQ0EsSUFBWSxHQUFaQSwrQ0FBUSxDQUFDLEVBQUUsQ0FBQyxFQUEvQ1UsYUFBYSxHQUFzQlYsSUFBWSxHQUFsQyxFQUFFVyxnQkFBZ0IsR0FBSVgsSUFBWSxHQUFoQjtJQUV0Q0QsZ0RBQVMsQ0FBQyxXQUFNO1FBQ2RhLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDUCxLQUFLLENBQUMsQ0FBQztRQUNuQkssZ0JBQWdCLENBQUNMLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVQLElBQU1RLG9CQUFvQixHQUFHLFNBQUNDLEtBQUssRUFBSztRQUN0QyxJQUFNQyxRQUFRLEdBQUdELEtBQUssQ0FBQ0UsTUFBTSxDQUFDWCxLQUFLO1FBQ25DSyxnQkFBZ0IsQ0FBQ0ssUUFBUSxDQUFDLENBQUM7UUFDM0JULGdCQUFnQixDQUFDUyxRQUFRLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBTUUsZUFBZTttQkFBRywrRkFBWTs7Z0JBQ2xDVCxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7O1FBQ3RCLENBQUM7d0JBRktTLGVBQWU7OztPQUVwQjtJQUVELHFCQUNFLDhEQUFDZiw2REFBVTtRQUNULG1CQUFtQjtRQUNuQmdCLFdBQVcsRUFBQyxTQUFTO1FBQ3JCQyxhQUFhLEVBQUMsWUFBWTtRQUMxQkMsSUFBSSxFQUFFYixTQUFTO1FBQ2ZjLElBQUksRUFBRTttQkFBTWIsWUFBWSxDQUFDLElBQUksQ0FBQztTQUFBO1FBQzlCYyxLQUFLLEVBQUU7bUJBQU1kLFlBQVksQ0FBQyxLQUFLLENBQUM7U0FBQTtRQUNoQ2UsSUFBSSxFQUFFLFdBQU07WUFDVk4sZUFBZSxFQUFFLENBQUM7UUFDcEIsQ0FBQztRQUNETyxNQUFNLEVBQUMsV0FBVztRQUNsQkMsS0FBSyxFQUFDLFNBQVM7UUFDZkMsTUFBTSxFQUFDLG9CQUFvQjtrQkFFM0IsNEVBQUNDLEtBQUc7WUFBQ0MsU0FBUyxFQUFDLHFDQUFxQzs7OEJBQ2xELDhEQUFDQyxHQUFDO29CQUFDRCxTQUFTLEVBQUMsd0JBQXdCOzhCQUFDLGtCQUFnQjs7Ozs7eUJBQUk7OEJBQzFELDhEQUFDekIsK0RBQVE7b0JBQ1B5QixTQUFTLEVBQUMseUNBQXlDO29CQUNuRHZCLEtBQUssRUFBRUksYUFBYTtvQkFDcEJxQixRQUFRLEVBQUVwQixnQkFBZ0I7b0JBQzFCcUIsUUFBUSxFQUFFbEIsb0JBQW9COzs7Ozt5QkFDOUI7Ozs7OztpQkFDRTs7Ozs7YUFDSyxDQUNiO0FBQ0osQ0FBQztHQTdDS1QsZUFBZTtBQUFmQSxLQUFBQSxlQUFlO0FBK0NyQixpRUFBZUEsZUFBZSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3BhZ2VzL2hiX2FwcC8xX2JvZHkvNl9UZXN0U3VtbWFyeS9zdW1tYXJ5L3Jlc3BvbnNlQ29udGVudC5qcz9jYWJhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlLCB1c2VDb250ZXh0LCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQb3B1cE1vZGFsIGZyb20gXCIuLi8uLi8uLi8uLi9oYl9jb21wb25lbnRzL3BvcHVwMVwiO1xuaW1wb3J0IFRleHRBcmVhIGZyb20gXCIuLi8uLi8uLi8uLi9oYl9jb21wb25lbnRzL3RleHRhcmVhXCI7XG5cbmNvbnN0IFJlc3BvbnNlQ29udGVudCA9ICh7IHZhbHVlLCBvblJlc3BvbnNlQ2hhbmdlIH0pID0+IHtcbiAgY29uc3QgW3BvcHVwRmxhZywgc2V0UG9wdXBGbGFnXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Jlc3BvbnNlVmFsdWUsIHNldFJlc3BvbnNlVmFsdWVdID0gdXNlU3RhdGUoXCJcIik7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zb2xlLmxvZyh2YWx1ZSk7XG4gICAgc2V0UmVzcG9uc2VWYWx1ZSh2YWx1ZSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVSZXNwb25zZUNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IG5ld1ZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHNldFJlc3BvbnNlVmFsdWUobmV3VmFsdWUpO1xuICAgIG9uUmVzcG9uc2VDaGFuZ2UobmV3VmFsdWUpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVBvcHVwU2F2ZSA9IGFzeW5jICgpID0+IHtcbiAgICBzZXRQb3B1cEZsYWcoZmFsc2UpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPFBvcHVwTW9kYWxcbiAgICAgIC8vIGxvZ289e2ZhRmlsZVBlbn1cbiAgICAgIGJ1dHRvbkxhYmVsPVwiY29udGVudFwiXG4gICAgICBsb2dvQ2xhc3NOYW1lPVwiIHByLVsxMHB4XVwiXG4gICAgICBmbGFnPXtwb3B1cEZsYWd9XG4gICAgICBvcGVuPXsoKSA9PiBzZXRQb3B1cEZsYWcodHJ1ZSl9XG4gICAgICBjbG9zZT17KCkgPT4gc2V0UG9wdXBGbGFnKGZhbHNlKX1cbiAgICAgIHNhdmU9eygpID0+IHtcbiAgICAgICAgaGFuZGxlUG9wdXBTYXZlKCk7XG4gICAgICB9fVxuICAgICAgaGVpZ2h0PVwiaC1bNDAwcHhdXCJcbiAgICAgIHdpZHRoPVwidy1bNDUlXVwiXG4gICAgICBoZWFkZXI9XCJWYWxpZGF0aW9uIERldGFpbHNcIlxuICAgID5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMiBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtWzVweF0gdGV4dC1ncmF5LTUwMFwiPlJlc3BvbnNlIENvbnRlbnQ8L3A+XG4gICAgICAgIDxUZXh0QXJlYVxuICAgICAgICAgIGNsYXNzTmFtZT1cInctWzUwMHB4XSBtYXgtaC1bMjAwcHhdIG92ZXJmbG93LXktYXV0b1wiXG4gICAgICAgICAgdmFsdWU9e3Jlc3BvbnNlVmFsdWV9XG4gICAgICAgICAgc2V0VmFsdWU9e3NldFJlc3BvbnNlVmFsdWV9XG4gICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZVJlc3BvbnNlQ2hhbmdlfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9Qb3B1cE1vZGFsPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVzcG9uc2VDb250ZW50O1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJ1c2VDb250ZXh0IiwidXNlUmVmIiwiUG9wdXBNb2RhbCIsIlRleHRBcmVhIiwiUmVzcG9uc2VDb250ZW50IiwidmFsdWUiLCJvblJlc3BvbnNlQ2hhbmdlIiwicG9wdXBGbGFnIiwic2V0UG9wdXBGbGFnIiwicmVzcG9uc2VWYWx1ZSIsInNldFJlc3BvbnNlVmFsdWUiLCJjb25zb2xlIiwibG9nIiwiaGFuZGxlUmVzcG9uc2VDaGFuZ2UiLCJldmVudCIsIm5ld1ZhbHVlIiwidGFyZ2V0IiwiaGFuZGxlUG9wdXBTYXZlIiwiYnV0dG9uTGFiZWwiLCJsb2dvQ2xhc3NOYW1lIiwiZmxhZyIsIm9wZW4iLCJjbG9zZSIsInNhdmUiLCJoZWlnaHQiLCJ3aWR0aCIsImhlYWRlciIsImRpdiIsImNsYXNzTmFtZSIsInAiLCJzZXRWYWx1ZSIsIm9uQ2hhbmdlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/hb_app/1_body/6_TestSummary/summary/responseContent.js\n"));

/***/ })

});