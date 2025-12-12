---
title: Test Mixin
slug: /sdk/python/api-reference/tests-mixin
---



[{% image align="right" style="float:right;" src="https://img.shields.io/badge/-source-cccccc?style=flat-square" /%}](https://github.com/open-metadata/OpenMetadata/tree/main/ingestion/src/metadata/ingestion/ometa/mixins/tests_mixin.py#L0")

# module `tests_mixin`
Mixin class containing Tests specific methods 

To be used by OpenMetadata class 



---

[{% image align="right" style="float:right;" src="https://img.shields.io/badge/-source-cccccc?style=flat-square" /%}](https://github.com/open-metadata/OpenMetadata/tree/main/ingestion/src/metadata/ingestion/ometa/mixins/tests_mixin.py#L49")

## class `OMetaTestsMixin`
OpenMetadata API methods related to Tests. 

To be inherited by OpenMetadata 




---

[{% image align="right" style="float:right;" src="https://img.shields.io/badge/-source-cccccc?style=flat-square" /%}](https://github.com/open-metadata/OpenMetadata/tree/main/ingestion/src/metadata/ingestion/ometa/mixins/tests_mixin.py#L297")

### method `add_logical_test_cases`

```python
add_logical_test_cases(data: CreateLogicalTestCases) → None
```

Add logical test cases to a test suite 



**Args:**
 
 - `data` (CreateLogicalTestCases):  logical test cases 

---

[{% image align="right" style="float:right;" src="https://img.shields.io/badge/-source-cccccc?style=flat-square" /%}](https://github.com/open-metadata/OpenMetadata/tree/main/ingestion/src/metadata/ingestion/ometa/mixins/tests_mixin.py#L58")

### method `add_test_case_results`

```python
add_test_case_results(test_results: TestCaseResult, test_case_fqn: str)
```

Add test case results to a test case 



**Args:**
 
 - `test_results` (TestCaseResult):  test case results to pass to the test case 
 - `test_case_fqn` (str):  test case fqn 



**Returns:**
 
 - `_type_`:  _description_ 

---

[{% image align="right" style="float:right;" src="https://img.shields.io/badge/-source-cccccc?style=flat-square" /%}](https://github.com/open-metadata/OpenMetadata/tree/main/ingestion/src/metadata/ingestion/ometa/mixins/tests_mixin.py#L260")

### method `create_or_update_executable_test_suite`

```python
create_or_update_executable_test_suite(data: CreateTestSuiteRequest) → TestSuite
```

Create or update an executable test suite 



**Args:**
 
 - `data` (CreateTestSuiteRequest):  test suite request 



**Returns:**
 
 - `TestSuite`:  test suite object 

---

[{% image align="right" style="float:right;" src="https://img.shields.io/badge/-source-cccccc?style=flat-square" /%}](https://github.com/open-metadata/OpenMetadata/tree/main/ingestion/src/metadata/ingestion/ometa/mixins/tests_mixin.py#L278")

### method `delete_executable_test_suite`

```python
delete_executable_test_suite(
    entity: Type[TestSuite],
    entity_id: Union[str, UUID],
    recursive: bool = False,
    hard_delete: bool = False
) → None
```

Delete executable test suite 



**Args:**
 
 - `entity_id` (str):  test suite ID 
 - `recursive` (bool, optional):  delete children if true 
 - `hard_delete` (bool, optional):  hard delete if true 

---

[{% image align="right" style="float:right;" src="https://img.shields.io/badge/-source-cccccc?style=flat-square" /%}](https://github.com/open-metadata/OpenMetadata/tree/main/ingestion/src/metadata/ingestion/ometa/mixins/tests_mixin.py#L201")

### method `get_or_create_executable_test_suite`

```python
get_or_create_executable_test_suite(
    entity_fqn: str
) → Union[EntityReference, TestSuite]
```

Given an entity fqn, retrieve the link test suite if it exists or create a new one 



**Args:**
 
 - `table_fqn` (str):  entity fully qualified name 



**Returns:**
 TestSuite: 

---

[{% image align="right" style="float:right;" src="https://img.shields.io/badge/-source-cccccc?style=flat-square" /%}](https://github.com/open-metadata/OpenMetadata/tree/main/ingestion/src/metadata/ingestion/ometa/mixins/tests_mixin.py#L161")

### method `get_or_create_test_case`

```python
get_or_create_test_case(
    test_case_fqn: str,
    entity_link: Optional[str] = None,
    test_definition_fqn: Optional[str] = None,
    test_case_parameter_values: Optional[List[TestCaseParameterValue]] = None
)
```

Get or create a test case 



**Args:**
 
 - `test_case_fqn` (str):  fully qualified name for the test 
 - `entity_link` (Optional[str], optional):  _description_. Defaults to None. 
 - `test_suite_fqn` (Optional[str], optional):  _description_. Defaults to None. 
 - `test_definition_fqn` (Optional[str], optional):  _description_. Defaults to None. 
 - `test_case_parameter_values` (Optional[str], optional):  _description_. Defaults to None. 



**Returns:**
 
 - `_type_`:  _description_ 

---

[{% image align="right" style="float:right;" src="https://img.shields.io/badge/-source-cccccc?style=flat-square" /%}](https://github.com/open-metadata/OpenMetadata/tree/main/ingestion/src/metadata/ingestion/ometa/mixins/tests_mixin.py#L115")

### method `get_or_create_test_definition`

```python
get_or_create_test_definition(
    test_definition_fqn: str,
    test_definition_description: Optional[str] = None,
    entity_type: Optional[EntityType] = None,
    test_platforms: Optional[List[TestPlatform]] = None,
    test_case_parameter_definition: Optional[List[TestCaseParameterDefinition]] = None
) → TestDefinition
```

Get or create a test definition 



**Args:**
 
 - `test_definition_fqn` (str):  test definition fully qualified name 
 - `test_definition_description` (Optional[str], optional):  description for the test definition.  Defaults to None. 
 - `entity_type` (Optional[EntityType], optional):  entity type (COLUMN or TABLE). Defaults to None. 
 - `test_platforms` (Optional[List[TestPlatform]], optional):  test platforms. Defaults to None. 
 - `test_case_parameter_definition` (Optional[List[TestCaseParameterDefinition]], optional):  parameters for the  test case definition. Defaults to None. 



**Returns:**
 
 - `TestDefinition`:  a test definition object 

---

[{% image align="right" style="float:right;" src="https://img.shields.io/badge/-source-cccccc?style=flat-square" /%}](https://github.com/open-metadata/OpenMetadata/tree/main/ingestion/src/metadata/ingestion/ometa/mixins/tests_mixin.py#L79")

### method `get_or_create_test_suite`

```python
get_or_create_test_suite(
    test_suite_name: str,
    test_suite_description: Optional[str] = 'Test Suite created on 2023-12-04'
) → TestSuite
```

Get or create a TestSuite 



**Args:**
 
 - `test_suite_name` (str):  test suite name 
 - `test_suite_description` (Optional[str], optional):  test suite description.  Defaults to f"Test Suite created on {datetime.now(timezone.utc).strftime('%Y-%m-%d')}". 



**Returns:**
 TestSuite: 

---

[{% image align="right" style="float:right;" src="https://img.shields.io/badge/-source-cccccc?style=flat-square" /%}](https://github.com/open-metadata/OpenMetadata/tree/main/ingestion/src/metadata/ingestion/ometa/mixins/tests_mixin.py#L231")

### method `get_test_case_results`

```python
get_test_case_results(
    test_case_fqn: str,
    start_ts: int,
    end_ts: int
) → Optional[List[TestCaseResult]]
```

Retrieve list of test cases 



**Args:**
 
 - `test_case_fqn` (str):  test_case_fqn 
 - `start_ts` (int):  timestamp 
 - `end_ts` (int):  timestamp 




---


