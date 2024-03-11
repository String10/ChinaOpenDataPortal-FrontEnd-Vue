## For Home View

```JSON
[
    {
        "suffix": "statistics",
        "method": "GET",
        "return-type": [ // 数据列表
            {
                "title": "string",
                "count": "number"
            }
            // ...
        ]
    },
    {
        "suffix": "activities",
        "method": "GET",
        "return-type": [ // 新闻列表
            {
                "title": "string",
                "detail": "string",
                "date": "string"
            }
            // ...
        ]
    }
]
```

## For Searching

```JSON
[
    {
        "suffix": "filters",
        "method": "GET",
        "return-type": {
            "locations": {
                "全部": [], // 必需
                "XX省": [
                    "全部", // 必需
                    "XX市",
                    "XX市"
                    // ...
                ],
                "XX市": [] // 空列表表示直辖市
                // ...
            },
            "industries": [
                "全部"
                // ...
            ]
        }
    },
    {
        "suffix": "search",
        "method": "GET",
        "parameters": {
            "q": "string", // 必需
            "openness": "无条件开放 | 有条件开放",
            "province": "string",
            "city": "string",
            "industry": "string"
        },
        "return-type": [
            {
                "doc_id": "number",
                "title": "string", // 使用class="server-set-highlight-title"高亮
                "description": "string", // 使用class="server-set-highlight-description"高亮
                "tags": "string[]",
                "department": "string",
                "category": "string",
                "industry": "string",
                "publish_time": "string",
                "update_time": "string",
                "update_frequency": "string",
                "is_open": "boolean",
                "data_volume": "string",
                "telephone": "string",
                "email": "string",
                "data_formats": "string[]",
                "province": "string",
                "city": "string", // 非必需
                "url": "string",
                "portal_name": "string",
                "standard_industry": "string"
            }
            // ...
        ]
    }
]
```
