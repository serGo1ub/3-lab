# 3-lab
В данной работе представлены три сервиса: accountants, statuses и reports
<br />
Statuses сервис. Хранит в себе статусы для reports и для accountants. 
<br />
После запросов на http://localhost:{port}/determineReportStatus и http://localhost:{port}/determineReportAccountant, сохраняет в reportInfo и accountantInfo текущие связи по id.
<br />
Reports сервис. Хранит информацию об отчётах и связь по id c бухгалтером.
<br />
Accountant сервис. Хранит информацию о бухгалтерах и их текущему статусу.
