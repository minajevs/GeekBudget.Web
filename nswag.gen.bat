node_modules/.bin/nswag swagger2tsclient ^
    /Template:Fetch ^
    /Input:https://budget-api-test.herokuapp.com/swagger/v1/swagger.json ^
    /Output:"./src/api/client.ts" ^
    /ClientBaseClass:BaseClient ^
    /ExtensionCode:"./src/api/baseClient.ts" ^
    /TypeScriptVersion:3 ^
    /DateTimeType:Date ^
    /UseTransformOptionsMethod:true