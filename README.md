# 3-lab
В данной работе представлены три сервиса: accountants, statuses и reports
Statuses сервис. Хранит в себе статусы для reports и для accountants. 
После запросов на http://localhost:{port}/determineReportStatus и http://localhost:{port}/determineReportAccountant, сохраняет в reportInfo и accountantInfo текущие связи по id.
Reports сервис. Хранит информацию об отчётах и связь по id c бухгалтером.
Accountant сервис. Хранит информацию о бухгалтерах и их текущему статусу.
