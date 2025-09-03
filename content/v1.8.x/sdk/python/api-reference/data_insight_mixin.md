---
title: Data Insight Mixin
slug: /sdk/python/api-reference/data-insight-mixin
---



[{% image align="right" style="float:right;" src="https://img.shields.io/badge/-source-cccccc?style=flat-square" /%}](https://github.com/open-metadata/OpenMetadata/tree/main/ingestion/src/metadata/ingestion/ometa/mixins/data_insight_mixin.py#L0")

# module `data_insight_mixin`
Mixin class containing data specific methods 

To be used by OpenMetadata class 



---

[{% image align="right" style="float:right;" src="https://img.shields.io/badge/-source-cccccc?style=flat-square" /%}](https://github.com/open-metadata/OpenMetadata/tree/main/ingestion/src/metadata/ingestion/ometa/mixins/data_insight_mixin.py#L36")

## class `DataInsightMixin`
data insight mixin used to write results 




---

[{% image align="right" style="float:right;" src="https://img.shields.io/badge/-source-cccccc?style=flat-square" /%}](https://github.com/open-metadata/OpenMetadata/tree/main/ingestion/src/metadata/ingestion/ometa/mixins/data_insight_mixin.py#L39")

### method `add_data_insight_report_data`

```python
add_data_insight_report_data(record: 'ReportData') → ReportData
```

Given a ReportData object convert it to a json payload and send a POST request to the report data endpoint 



**Args:**
 
 - `record` (ReportData):  report data 

---

[{% image align="right" style="float:right;" src="https://img.shields.io/badge/-source-cccccc?style=flat-square" /%}](https://github.com/open-metadata/OpenMetadata/tree/main/ingestion/src/metadata/ingestion/ometa/mixins/data_insight_mixin.py#L51")

### method `add_kpi_result`

```python
add_kpi_result(fqn: 'str', record: 'KpiResult') → KpiResult
```

Given a ReportData object convert it to a json payload and send a POST request to the report data endpoint 



**Args:**
 
 - `record` (ReportData):  report data 

---

[{% image align="right" style="float:right;" src="https://img.shields.io/badge/-source-cccccc?style=flat-square" /%}](https://github.com/open-metadata/OpenMetadata/tree/main/ingestion/src/metadata/ingestion/ometa/mixins/data_insight_mixin.py#L63")

### method `add_web_analytic_events`

```python
add_web_analytic_events(
    event_data: 'WebAnalyticEventData'
) → List[WebAnalyticEventData]
```

Get web analytic event 

---

[{% image align="right" style="float:right;" src="https://img.shields.io/badge/-source-cccccc?style=flat-square" /%}](https://github.com/open-metadata/OpenMetadata/tree/main/ingestion/src/metadata/ingestion/ometa/mixins/data_insight_mixin.py#L148")

### method `create_kpi`

```python
create_kpi(create: 'CreateKpiRequest') → Kpi
```





---

[{% image align="right" style="float:right;" src="https://img.shields.io/badge/-source-cccccc?style=flat-square" /%}](https://github.com/open-metadata/OpenMetadata/tree/main/ingestion/src/metadata/ingestion/ometa/mixins/data_insight_mixin.py#L191")

### method `delete_report_data`

```python
delete_report_data(report_data_type: 'ReportDataType') → None
```

Delete report data for a specific report data type 



**Args:**
 
 - `report_data_type` (ReportDataType):  report date type to delete 

---

[{% image align="right" style="float:right;" src="https://img.shields.io/badge/-source-cccccc?style=flat-square" /%}](https://github.com/open-metadata/OpenMetadata/tree/main/ingestion/src/metadata/ingestion/ometa/mixins/data_insight_mixin.py#L178")

### method `delete_report_data_at_date`

```python
delete_report_data_at_date(
    report_data_type: 'ReportDataType',
    date: 'str'
) → None
```

Delete report data at a specific date for a specific report data type 



**Args:**
 
 - `report_data_type` (ReportDataType):  report date type to delete 
 - `date` (str):  date for which to delete the report data 

---

[{% image align="right" style="float:right;" src="https://img.shields.io/badge/-source-cccccc?style=flat-square" /%}](https://github.com/open-metadata/OpenMetadata/tree/main/ingestion/src/metadata/ingestion/ometa/mixins/data_insight_mixin.py#L166")

### method `delete_web_analytic_event_before_ts_exclusive`

```python
delete_web_analytic_event_before_ts_exclusive(
    event_type: 'WebAnalyticEventType',
    tmsp: 'int'
)
```

Deletes web analytics events before a timestamp 



**Args:**
 
 - `event_type` (WebAnalyticEventData):  web analytic event type 
 - `tmsp` (int):  timestamp 

---

[{% image align="right" style="float:right;" src="https://img.shields.io/badge/-source-cccccc?style=flat-square" /%}](https://github.com/open-metadata/OpenMetadata/tree/main/ingestion/src/metadata/ingestion/ometa/mixins/data_insight_mixin.py#L94")

### method `get_aggregated_data_insight_results`

```python
get_aggregated_data_insight_results(
    start_ts: 'int',
    end_ts: 'int',
    data_insight_chart_name: 'str',
    data_report_index: 'str',
    params: 'Optional[dict]' = None
) → DataInsightChartResult
```

_summary_ 



**Args:**
 
 - `start_ts` (int):  _description_ 
 - `end_ts` (int):  _description_ 
 - `data_insight_chart_name` (str):  _description_ 
 - `data_report_index` (str):  _description_ 
 - `params` (Optional[dict], optional):  _description_. Defaults to None. 



**Returns:**
 
 - `DataInsightChartResult`:  _description_ 

---

[{% image align="right" style="float:right;" src="https://img.shields.io/badge/-source-cccccc?style=flat-square" /%}](https://github.com/open-metadata/OpenMetadata/tree/main/ingestion/src/metadata/ingestion/ometa/mixins/data_insight_mixin.py#L73")

### method `get_data_insight_report_data`

```python
get_data_insight_report_data(
    start_ts: 'int',
    end_ts: 'int',
    report_data_type: 'str'
) → dict[str, list[ReportData]]
```

Return dict with a list of report data given a start and end date 



**Args:**
 
 - `start_ts` (_type_):  start_timestamp 
 - `end_ts` (_type_):  end timestampe 
 - `report_data_type` (ReportDataType):  report data type 



**Returns:**
 List[ReportData]: 

---

[{% image align="right" style="float:right;" src="https://img.shields.io/badge/-source-cccccc?style=flat-square" /%}](https://github.com/open-metadata/OpenMetadata/tree/main/ingestion/src/metadata/ingestion/ometa/mixins/data_insight_mixin.py#L132")

### method `get_kpi_result`

```python
get_kpi_result(fqn: 'str', start_ts, end_ts) → list[KpiResult]
```

Given FQN return KPI results 



**Args:**
 
 - `fqn` (str):  fullyQualifiedName 

---

[{% image align="right" style="float:right;" src="https://img.shields.io/badge/-source-cccccc?style=flat-square" /%}](https://github.com/open-metadata/OpenMetadata/tree/main/ingestion/src/metadata/ingestion/ometa/mixins/data_insight_mixin.py#L153")

### method `get_web_analytic_events`

```python
get_web_analytic_events(
    event_type: 'WebAnalyticEventType',
    start_ts: 'int',
    end_ts: 'int'
) → List[WebAnalyticEventData]
```

Get web analytic event 




---


