const RESOURCES = {
  kali: { label: 'Kali Docs', title: 'Документация Kali Linux', desc: 'Установка, виртуализация и безопасная настройка рабочей среды.', url: 'https://www.kali.org/docs/' },
  python: { label: 'Python', title: 'Официальная документация Python', desc: 'Язык, стандартная библиотека, argparse, pathlib, socket и logging.', url: 'https://docs.python.org/3/' },
  portswigger: { label: 'Web', title: 'Web Security Academy', desc: 'Теория и интерактивные лаборатории по веб-уязвимостям.', url: 'https://portswigger.net/web-security/learning-paths' },
  owasp: { label: 'Методология', title: 'OWASP WSTG', desc: 'Структурированная методика тестирования веб-приложений.', url: 'https://owasp.org/projects/web-security-testing-guide' },
  top10: { label: 'Web', title: 'OWASP Top 10:2025', desc: 'Актуальная карта ключевых рисков безопасности веб-приложений.', url: 'https://top10.owasp.org/2025/' },
  nmap: { label: 'Сети', title: 'Nmap Reference Guide', desc: 'Официальная справка по обнаружению хостов и сервисов.', url: 'https://nmap.org/book/man.html' },
  microsoft: { label: 'Windows / AD', title: 'Microsoft Learn: Security Principals', desc: 'Учетные записи, SID, группы, ACL и модель доступа Windows.', url: 'https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-security-principals' },
  juice: { label: 'Лаборатория', title: 'OWASP Juice Shop', desc: 'Намеренно уязвимое приложение для легальной локальной практики.', url: 'https://owasp.org/www-project-juice-shop/' },
  bandit: { label: 'Linux', title: 'OverTheWire: Bandit', desc: 'Практика Linux и SSH в формате последовательных заданий.', url: 'https://overthewire.org/wargames/bandit/' },
  asvs: { label: 'AppSec', title: 'OWASP ASVS 5.0', desc: 'Проверяемые требования к контролям безопасности приложений.', url: 'https://owasp.org/projects/asvs' },
  api: { label: 'API', title: 'OWASP API Security Top 10', desc: 'Ключевые риски современных REST и других HTTP API.', url: 'https://api-security.owasp.org/' },
  offsec: { label: 'Профессия', title: 'OffSec PEN-200 Syllabus', desc: 'Актуальный ориентир по ядру практического инфраструктурного пентеста.', url: 'https://manage.offsec.com/app/uploads/2026/03/PEN-200_Syllabus.pdf' },
  htb: { label: 'Практика', title: 'HTB Penetration Tester Path', desc: 'Практические модули от scope до enterprise assessment.', url: 'https://academy.hackthebox.com/path/preview/penetration-tester' },
  docker: { label: 'Cloud-native', title: 'Docker Security Docs', desc: 'Официальная база по границам и настройкам безопасности контейнеров.', url: 'https://docs.docker.com/engine/security/' }
};

const LESSONS = {
  1: "01-laboratoriya-i-linux-cli.md",
};

const phases = [
  {
    id: 1,
    title: 'Фундамент',
    weeks: '01–04',
    desc: 'Linux, сети, безопасная лаборатория и базовая методология. Сначала понимание системы — затем инструменты.',
    items: [
      { week: 1, title: 'Лаборатория и Linux CLI', outcome: 'Изолированная учебная сеть, рабочие заметки и первый Python CLI-инструмент.', links: ['kali', 'python'], tasks: [
        { t: 'Зафиксировать правила практики', d: 'Создай шаблон scope: разрешённые цели, время работ, запрещённые действия, контакты и критерий остановки.', c: 'Методология' },
        { t: 'Развернуть изолированную лабораторию', d: 'Kali или Ubuntu как рабочая машина и намеренно уязвимая цель. Используй host-only/NAT без доступа к чужим сетям.', c: 'Лаборатория' },
        { t: 'Повторить Linux CLI', d: 'Файлы, права, пользователи, процессы, службы, пайпы, grep, sed, awk, curl, SSH и журнал команд.', c: 'Linux' },
        { t: 'Python: CLI-парсер логов', d: 'argparse + pathlib: прочитать файл, посчитать события по IP/коду и вывести краткую сводку.', c: 'Python' }
      ]},
      { week: 2, title: 'TCP/IP, DNS и трафик', outcome: 'Ты объясняешь путь запроса от клиента до сервера и умеешь подтвердить его захватом пакетов.', links: ['nmap', 'python'], tasks: [
        { t: 'Разобрать TCP/IP и подсети', d: 'IPv4, CIDR, шлюз, ARP, TCP handshake, UDP, основные порты и маршрутизация.', c: 'Сети' },
        { t: 'Исследовать DNS, HTTP и TLS', d: 'Сними трафик своей лаборатории и найди DNS-запрос, TCP-сессию и TLS handshake.', c: 'Лаборатория' },
        { t: 'Практика диагностики', d: 'Используй ip/ss/ping/traceroute/dig/curl и объясни, на каком уровне находится каждая проблема.', c: 'Сети' },
        { t: 'Python: безопасный сканер портов', d: 'socket + таймауты + argparse. Сканируй только localhost или свою лабораторную VM; сохрани результат в JSON.', c: 'Python' }
      ]},
      { week: 3, title: 'Linux изнутри', outcome: 'Ты понимаешь права, процессы, службы и логи настолько, чтобы отличить норму от опасной конфигурации.', links: ['bandit', 'kali'], tasks: [
        { t: 'Права и повышение привилегий — теория', d: 'UID/GID, rwx, sudoers, SUID/SGID, capabilities, cron, systemd и переменные окружения.', c: 'Linux' },
        { t: 'Пройти Bandit 0–10', d: 'Для каждого уровня запиши ключевую команду и почему она сработала, не копируя готовое решение.', c: 'Лаборатория' },
        { t: 'Разобрать процессы и логи', d: 'ps, top, lsof, journalctl, auth.log и сетевые сокеты. Составь чек-лист первичной проверки хоста.', c: 'Linux' },
        { t: 'Python: анализ auth.log', d: 'Найди неуспешные входы, сгруппируй источники, добавь CSV-выгрузку и обработку ошибок.', c: 'Python' }
      ]},
      { week: 4, title: 'Методология и первый мини-аудит', outcome: 'Короткий воспроизводимый отчёт по своей лаборатории: область, находки, доказательства и исправления.', links: ['owasp', 'nmap'], tasks: [
        { t: 'Освоить цикл пентеста', d: 'Scope → разведка → перечисление → проверка → оценка риска → очистка → отчёт.', c: 'Методология' },
        { t: 'Провести инвентаризацию лаборатории', d: 'Обнаружь свои хосты и сервисы, проверь версии вручную и сохрани исходные результаты.', c: 'Лаборатория' },
        { t: 'Проверить одну слабую конфигурацию', d: 'Только в учебной среде: подтвердить проблему минимальным воздействием и убрать созданные артефакты.', c: 'Лаборатория' },
        { t: 'Написать мини-отчёт', d: 'Executive summary, scope, методика, доказательство, риск, рекомендация и приложение с командами.', c: 'Отчёт' }
      ]}
    ]
  },
  {
    id: 2,
    title: 'Веб и разведка',
    weeks: '05–08',
    desc: 'HTTP под микроскопом, Burp Suite, картирование поверхности и первые серверные уязвимости.',
    items: [
      { week: 5, title: 'HTTP и устройство веб-приложения', outcome: 'Ты читаешь сырой HTTP-запрос, понимаешь состояние сессии и видишь границы доверия.', links: ['portswigger', 'top10'], tasks: [
        { t: 'Разобрать HTTP глубже', d: 'Методы, коды, заголовки, cookies, cache, content types, same-origin policy и TLS.', c: 'Web' },
        { t: 'Проследить запрос через своё backend-приложение', d: 'Маршрут, middleware, валидация, база, шаблон/JSON и ответ. Отметь места входа данных.', c: 'Лаборатория' },
        { t: 'Освежить HTML и JavaScript', d: 'DOM, формы, fetch, localStorage, события и кодирование данных — ровно настолько, чтобы анализировать клиент.', c: 'Web' },
        { t: 'Python: HTTP-инспектор', d: 'requests/httpx: URL, метод, заголовки, редиректы, таймауты; безопасный вывод метаданных ответа.', c: 'Python' }
      ]},
      { week: 6, title: 'Burp Suite и ручной workflow', outcome: 'Ты перехватываешь, изменяешь и повторяешь запросы, сохраняя понятную историю теста.', links: ['portswigger'], tasks: [
        { t: 'Настроить прокси и сертификат', d: 'Работай с учебным браузером и отдельным профилем. Освой Proxy history, Repeater и Decoder.', c: 'Web' },
        { t: 'Картировать приложение вручную', d: 'Роли, точки входа, параметры, API, загрузки, аутентификация, смена состояния и доверенные границы.', c: 'Методология' },
        { t: 'Решить вводные лаборатории Academy', d: 'Пройди раздел Getting started и несколько apprentice labs без погони за количеством.', c: 'Лаборатория' },
        { t: 'Собрать шаблон заметки по запросу', d: 'Endpoint, роль, предположение, исходный запрос, изменение, результат, доказательство, вывод.', c: 'Отчёт' }
      ]},
      { week: 7, title: 'Разведка и поверхность атаки', outcome: 'Карта учебной цели: технологии, контент, параметры, роли и гипотезы — без шумного сканирования.', links: ['owasp', 'portswigger'], tasks: [
        { t: 'Освоить пассивную и активную разведку', d: 'Разделяй внешние данные и запросы к цели. Всегда соблюдай rate limit и заданный scope.', c: 'Методология' },
        { t: 'Провести content discovery в лаборатории', d: 'robots.txt, sitemap, известные пути, JavaScript-файлы, параметры и виртуальные хосты.', c: 'Лаборатория' },
        { t: 'Составить attack surface map', d: 'Таблица endpoint → метод → вход → роль → чувствительные данные → гипотеза проверки.', c: 'Web' },
        { t: 'Python: нормализатор URL', d: 'urllib.parse: нормализация, дедупликация, фильтрация по разрешённому домену и экспорт CSV.', c: 'Python' }
      ]},
      { week: 8, title: 'Инъекции: SQL и команды', outcome: 'Ты понимаешь причину инъекции, вручную подтверждаешь её в лаборатории и предлагаешь корректное исправление.', links: ['portswigger', 'top10'], tasks: [
        { t: 'Изучить SQL injection', d: 'Контекст запроса, ошибки, boolean/time-based признаки, параметризованные запросы и минимальное подтверждение.', c: 'Web' },
        { t: 'Изучить OS command injection', d: 'Граница между данными и командой, безопасная проверка и защита через отказ от shell.', c: 'Web' },
        { t: 'Решить 6–8 apprentice labs', d: 'SQLi и command injection в Web Security Academy. После каждой — собственное объяснение причины.', c: 'Лаборатория' },
        { t: 'Оформить две находки', d: 'Добавь impact, воспроизводимость, точную рекомендацию разработчику и ссылку на первичный источник.', c: 'Отчёт' }
      ]}
    ]
  },
  {
    id: 3,
    title: 'Веб-уязвимости',
    weeks: '09–12',
    desc: 'Контроль доступа, браузерные атаки, серверные обработчики и API. Меньше payload-ов, больше понимания логики.',
    items: [
      { week: 9, title: 'Аутентификация и контроль доступа', outcome: 'Матрица ролей и несколько подтверждённых в лаборатории ошибок доступа.', links: ['portswigger', 'owasp'], tasks: [
        { t: 'Разобрать auth и session management', d: 'Регистрация, вход, восстановление, MFA, смена пароля, cookies, logout и фиксация сессии.', c: 'Web' },
        { t: 'Построить матрицу доступа', d: 'Роли × действия × объекты. Проверь horizontal/vertical access control и прямые идентификаторы.', c: 'Методология' },
        { t: 'Решить labs по auth и access control', d: 'Не менее 6 apprentice labs; фиксируй исходный запрос и минимальное изменение.', c: 'Лаборатория' },
        { t: 'Python: diff ответов', d: 'Сравнивать статус, длину, ключевые заголовки и хеш тела двух разрешённых лабораторных запросов.', c: 'Python' }
      ]},
      { week: 10, title: 'XSS, CSRF, CORS и DOM', outcome: 'Ты различаешь контексты браузера и объясняешь защиту: encoding, CSP, SameSite и origin validation.', links: ['portswigger', 'top10'], tasks: [
        { t: 'Изучить XSS по контекстам', d: 'HTML, атрибут, JavaScript, URL и DOM sinks; output encoding и Content Security Policy.', c: 'Web' },
        { t: 'Разобрать CSRF и CORS', d: 'SameSite, anti-CSRF token, Origin/Referer и опасные комбинации CORS с credentials.', c: 'Web' },
        { t: 'Решить 6–8 apprentice labs', d: 'Reflected/stored/DOM XSS, CSRF и CORS — только в Web Security Academy.', c: 'Лаборатория' },
        { t: 'Сделать памятку браузерных границ', d: 'Схема origin, cookies, DOM, источники/приёмники данных и типичная защита.', c: 'Отчёт' }
      ]},
      { week: 11, title: 'Серверные sinks и обработчики', outcome: 'Чек-лист проверки путей, загрузок, server-side fetch, parser/template и serialization функций.', links: ['portswigger', 'owasp', 'asvs'], tasks: [
        { t: 'Изучить path traversal и file upload', d: 'Каноникализация путей, allowlist, хранение вне web-root, тип/содержимое и безопасное имя.', c: 'Web' },
        { t: 'Разобрать SSRF, XXE, SSTI и deserialization', d: 'Границы сети/парсера/шаблона/объекта, привилегированный sink и безопасная конфигурация.', c: 'Web' },
        { t: 'Решить 4 core labs + guided exposure', d: 'Traversal, upload, SSRF и XXE руками; SSTI/deserialization — один вводный разбор каждого.', c: 'Лаборатория' },
        { t: 'Python: безопасный загрузчик артефактов', d: 'Проверка размера, расширения, имени, SHA-256 и сохранение метаданных без исполнения файла.', c: 'Python' }
      ]},
      { week: 12, title: 'Современные API и auth-протоколы', outcome: 'Мини-аудит учебного API плюс база JWT, OAuth/OIDC, GraphQL и новых классов web-рисков.', links: ['portswigger', 'owasp', 'asvs', 'api'], tasks: [
        { t: 'Изучить REST/OpenAPI и API Top 10', d: 'BOLA/BFLA, property authorization, mass assignment, resource limits, inventory и unsafe consumption.', c: 'Web' },
        { t: 'Разобрать JWT, OAuth/OIDC и GraphQL', d: 'Validation, issuer/audience, redirect/state/nonce/PKCE, schema/introspection и server-side authorization.', c: 'Web' },
        { t: 'Провести мини-аудит современного API', d: '3 API labs + JWT + GraphQL; обзор WebSockets, NoSQLi, races, cache issues и LLM-connected APIs.', c: 'Лаборатория' },
        { t: 'Сдать отчёт №2', d: 'Добавь severity rationale, цепочку воздействия, воспроизводимость и проверяемые рекомендации.', c: 'Отчёт' }
      ]}
    ]
  },
  {
    id: 4,
    title: 'Сети и системы',
    weeks: '13–16',
    desc: 'Перечисление сервисов, проверка гипотез и повышение привилегий в контролируемой лаборатории.',
    items: [
      { week: 13, title: 'Nmap и перечисление сервисов', outcome: 'Аккуратная инвентаризация сети с подтверждёнными сервисами и приоритетами проверки.', links: ['nmap'], tasks: [
        { t: 'Освоить стратегию сканирования', d: 'Host discovery, TCP connect/SYN концепции, UDP выборочно, версии, scripts и влияние скорости.', c: 'Сети' },
        { t: 'Сопоставить порт с реальным сервисом', d: 'Banner ≠ доказательство. Подтверди протокол вручную и сохрани исходный ответ.', c: 'Лаборатория' },
        { t: 'Сформировать service matrix', d: 'Хост, порт, протокол, продукт, версия, метод подтверждения, риск-гипотеза, следующий шаг.', c: 'Методология' },
        { t: 'Python: парсер Nmap XML', d: 'Преврати XML в нормализованный JSON/CSV и выдели неизвестные или редко встречающиеся сервисы.', c: 'Python' }
      ]},
      { week: 14, title: 'Сервисы, пароли и передача файлов', outcome: 'Playbook перечисления сервисов и безопасная практика с credentials и file transfer.', links: ['nmap', 'microsoft', 'htb'], tasks: [
        { t: 'Изучить SMB, SSH, FTP, DNS, SMTP, SNMP и базы', d: 'Handshake, authentication, anonymous/default access, permissions, disclosure и service-specific объекты.', c: 'Сети' },
        { t: 'Разобрать password attacks безопасно', d: 'Online/offline, hashes, wordlists, mutations, spraying risk, rate limits и lockout — только тестовые учётные записи.', c: 'Лаборатория' },
        { t: 'Отработать file transfer и evidence', d: 'Передай файл между своими Linux/Windows VM, проверь SHA-256 и сохрани журнал происхождения.', c: 'Отчёт' },
        { t: 'Python: нормализатор результатов', d: 'Объединить несколько текстовых/JSON результатов в единый список активов без дублей.', c: 'Python' }
      ]},
      { week: 15, title: 'Vulnerability research, exploits и shells', outcome: 'Ты переходишь от версии к доказуемой уязвимости, понимаешь публичный exploit и останавливаешься после минимального подтверждения.', links: ['nmap', 'kali', 'offsec', 'htb'], tasks: [
        { t: 'Освоить triage и public-exploit research', d: 'Версия/конфигурация → vendor advisory/CVE → prerequisites → чтение кода → применимость → side effects.', c: 'Методология' },
        { t: 'Сравнить manual, Metasploit и shell concepts', d: 'В своей лаборатории проверь сценарий вручную/через framework; разберись в bind/reverse shell и TTY.', c: 'Лаборатория' },
        { t: 'Отработать безопасную остановку', d: 'Минимальное доказательство, отсутствие персистентности, удаление артефактов и журнал действий.', c: 'Методология' },
        { t: 'Написать remediation note', d: 'Патч/конфигурация, временная мера, способ проверки исправления и остаточный риск.', c: 'Отчёт' }
      ]},
      { week: 16, title: 'Повышение привилегий Linux и Windows', outcome: 'Два системных чек-листа и по одному полностью документированному лабораторному пути.', links: ['microsoft', 'kali'], tasks: [
        { t: 'Linux privilege escalation', d: 'sudo, SUID, capabilities, cron, сервисы, секреты, writable paths и версия ядра — сначала перечисление.', c: 'Linux' },
        { t: 'Windows privilege escalation', d: 'Токены, службы, ACL, scheduled tasks, registry, credentials и патчи — только в учебной VM.', c: 'Windows / AD' },
        { t: 'Пройти два лабораторных сценария', d: 'Один Linux и один Windows. Объясни первопричину, не только последовательность команд.', c: 'Лаборатория' },
        { t: 'Python: локальный сборщик фактов', d: 'Кроссплатформенно собрать безопасные системные факты без изменения конфигурации; вывод в JSON.', c: 'Python' }
      ]}
    ]
  },
  {
    id: 5,
    title: 'Active Directory',
    weeks: '17–20',
    desc: 'Модель Windows-домена, перечисление, типовые цепочки атак и перемещение внутри изолированной сети.',
    items: [
      { week: 17, title: 'Windows и устройство домена', outcome: 'Небольшой домен-лаборатория и понятная схема идентификации, аутентификации и авторизации.', links: ['microsoft'], tasks: [
        { t: 'Разобрать основы AD DS', d: 'Domain, forest, OU, users, groups, computers, GPO, SID, ACL, LDAP, Kerberos и NTLM.', c: 'Windows / AD' },
        { t: 'Построить изолированный домен', d: 'Контроллер домена, рабочая станция и пользовательские роли; сделай snapshot до экспериментов.', c: 'Лаборатория' },
        { t: 'Понять Kerberos поток', d: 'TGT, TGS, SPN, tickets и время. Нарисуй последовательность входа пользователя к сервису.', c: 'Windows / AD' },
        { t: 'Проверить защитные настройки', d: 'Парольная политика, локальные администраторы, SMB signing, аудит и базовые журналы.', c: 'Windows / AD' }
      ]},
      { week: 18, title: 'Перечисление домена', outcome: 'Карта объектов, групп, сессий и разрешений домена с объяснением каждого источника данных.', links: ['microsoft'], tasks: [
        { t: 'Собрать данные штатными средствами', d: 'whoami, PowerShell, net, LDAP-концепции и разрешённые запросы к каталогу.', c: 'Windows / AD' },
        { t: 'Построить граф отношений', d: 'Пользователи, группы, компьютеры, sessions, local admins, ACL и возможные пути — только в своём домене.', c: 'Лаборатория' },
        { t: 'Проверить каждую гипотезу вручную', d: 'Граф — подсказка, а не доказательство. Подтверди права и условия безопасным запросом.', c: 'Методология' },
        { t: 'Python: анализ CSV домена', d: 'Найти вложенные группы, дубли, высокопривилегированные учетные записи и сформировать Markdown-сводку.', c: 'Python' }
      ]},
      { week: 19, title: 'Типовые AD-цепочки', outcome: 'Три лабораторных сценария с первопричиной, детектированием и исправлением.', links: ['microsoft'], tasks: [
        { t: 'Изучить атаки на учетные данные', d: 'AS-REP roasting, Kerberoasting, password spraying риски и почему offline cracking не равен доступу.', c: 'Windows / AD' },
        { t: 'Разобрать NTLM и делегирование', d: 'Pass-the-hash концепция, relay prerequisites, delegation и защитные настройки.', c: 'Windows / AD' },
        { t: 'Отработать три сценария в своём домене', d: 'Минимальное подтверждение, никаких внешних целей; после каждого восстанови snapshot.', c: 'Лаборатория' },
        { t: 'Составить blue-team приложение', d: 'Для каждой техники: событие/след, контроль предотвращения и способ проверки исправления.', c: 'Отчёт' }
      ]},
      { week: 20, title: 'Pivoting и внутренний мини-аудит', outcome: 'Полная цепочка внутреннего теста с сегментацией, маршрутом, доказательствами и отчётом.', links: ['nmap', 'microsoft'], tasks: [
        { t: 'Понять pivoting и tunneling', d: 'Маршруты, SOCKS, port forwarding и прокси-цепочки как способ доступа внутри разрешённого scope.', c: 'Сети' },
        { t: 'Собрать двухсегментную лабораторию', d: 'Рабочая машина видит первый сегмент, целевой сервис — только второй. Документируй схему.', c: 'Лаборатория' },
        { t: 'Провести мини-аудит домена', d: 'Scope → enum → гипотеза → минимальное доказательство → cleanup → retest.', c: 'Лаборатория' },
        { t: 'Сдать отчёт №3', d: 'Executive summary для руководителя плюс техническая цепочка и приоритетный план исправлений.', c: 'Отчёт' }
      ]}
    ]
  },
  {
    id: 6,
    title: 'Профессиональный цикл',
    weeks: '21–24',
    desc: 'Cloud/container база, безопасная автоматизация, сквозные аудиты и портфолио без раскрытия чужих данных.',
    items: [
      { week: 21, title: 'Cloud, containers и supply chain', outcome: 'Базовая модель cloud IAM, container isolation и software supply chain с исправленной лабораторной misconfiguration.', links: ['top10', 'asvs', 'docker', 'offsec'], tasks: [
        { t: 'Разобрать cloud IAM и shared responsibility', d: 'Account/project, identity, role, policy, temporary credentials, least privilege и public exposure.', c: 'Cloud' },
        { t: 'Исследовать безопасность контейнера', d: 'Image/layers, non-root user, mounts, secrets, capabilities, namespaces и network boundaries.', c: 'Cloud' },
        { t: 'Смоделировать software supply chain', d: 'Dependency/lockfile, repository, CI secret, artifact provenance, registry и runtime trust.', c: 'Методология' },
        { t: 'Создать и исправить misconfiguration', d: 'В локальной lab покажи root container/secret/excessive policy, затем документируй fix и retest.', c: 'Лаборатория' }
      ]},
      { week: 22, title: 'Python-инструментарий пентестера', outcome: 'Поддерживаемый CLI-проект с scope guardrails, тестами, логированием, конфигурацией и README.', links: ['python'], tasks: [
        { t: 'Привести Python-базу в порядок', d: 'venv, packaging, typing, dataclasses, exceptions, logging, argparse, pathlib и unit tests.', c: 'Python' },
        { t: 'Продумать безопасную архитектуру', d: 'Allowlist, dry-run, таймауты, bounded concurrency, rate limit, retries и redaction.', c: 'Python' },
        { t: 'Собрать asset-enrichment CLI', d: 'Nmap/CSV → нормализация → scoped HTTP metadata → Markdown/JSON отчёт.', c: 'Python' },
        { t: 'Оформить engineering evidence', d: 'README, threat model, ограничения, tests, fixture server, примеры и лицензия.', c: 'Отчёт' }
      ]},
      { week: 23, title: 'Сквозной веб-аудит', outcome: 'Полный black-box аудит учебного приложения без подсказок по типу уязвимости.', links: ['portswigger', 'owasp', 'asvs', 'juice'], tasks: [
        { t: 'Зафиксировать scope и coverage plan', d: 'Роли, данные, лимиты, config/auth/session/access/input/logic/client/API по WSTG и ASVS.', c: 'Методология' },
        { t: 'Провести blind аудит', d: 'Работай от assets, trust boundaries и hypotheses; не используй название задания как подсказку.', c: 'Лаборатория' },
        { t: 'Валидировать и очистить', d: 'Убрать false positives, минимизировать PoC, сохранить evidence и удалить артефакты.', c: 'Лаборатория' },
        { t: 'Сдать и повторить отчёт', d: 'Executive/technical report, remediation, coverage, ограничения и blind retest через сутки.', c: 'Отчёт' }
      ]},
      { week: 24, title: 'Internal capstone и следующий уровень', outcome: 'Полный internal/AD audit, retest, портфолио и доказательный план развития на 90 дней.', links: ['microsoft', 'nmap', 'offsec', 'htb'], tasks: [
        { t: 'Провести blind internal assessment', d: 'Host/service enum, credentials, Windows/AD, segmentation, одна безопасная цепочка и cleanup.', c: 'Лаборатория' },
        { t: 'Исправить и выполнить retest', d: 'Разорви один attack path конфигурацией и докажи, что прежняя техника больше не работает.', c: 'Методология' },
        { t: 'Собрать обезличенное портфолио', d: 'Python CLI, web/internal reports, diagram и technical write-up без секретов и чужих данных.', c: 'Отчёт' },
        { t: 'Сделать gap-анализ и план 90 дней', d: 'Оцени 7 доменов по доказательствам и выбери один фокус: web, internal/AD или cloud.', c: 'Методология' }
      ]}
    ]
  }
];

const STORAGE_KEY = 'redpath-roadmap-v2';
const allWeeks = phases.flatMap(phase => phase.items.map(week => ({ ...week, phaseId: phase.id })));
const allTasks = allWeeks.flatMap(week => week.tasks.map((task, index) => ({ ...task, id: `w${week.week}-t${index + 1}`, week: week.week })));
const defaultState = { done: [], notes: {}, startDate: '', phase: 'all', category: 'all', query: '', pendingOnly: false };
let state = loadState();
let toastTimer;

const el = id => document.getElementById(id);
const roadmapContent = el('roadmapContent');

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return {
      ...defaultState,
      ...saved,
      done: Array.isArray(saved.done) ? saved.done.filter(id => typeof id === 'string') : [],
      notes: saved.notes && typeof saved.notes === 'object' ? saved.notes : {}
    };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function taskId(week, index) {
  return `w${week}-t${index + 1}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
}

function currentWeek() {
  if (!state.startDate) return 1;
  const start = new Date(`${state.startDate}T00:00:00`);
  const now = new Date();
  const day = Math.floor((now - start) / 86400000);
  return Math.max(1, Math.min(24, Math.floor(day / 7) + 1));
}

function updateProgress() {
  const validDone = new Set(state.done.filter(id => allTasks.some(task => task.id === id)));
  const percent = Math.round(validDone.size / allTasks.length * 100);
  const completedWeeks = allWeeks.filter(week => week.tasks.every((_, index) => validDone.has(taskId(week.week, index)))).length;
  const estimatedHours = Math.round(validDone.size / allTasks.length * 216);
  el('progressPercent').textContent = percent;
  el('progressBar').style.width = `${percent}%`;
  el('progressCopy').textContent = `${validDone.size} из ${allTasks.length} задач выполнено`;
  el('weeksDone').textContent = `${completedWeeks} / 24`;
  el('hoursDone').textContent = `≈ ${estimatedHours} ч`;
  const week = currentWeek();
  const box = el('currentWeekBox');
  const weekData = allWeeks.find(item => item.week === week);
  box.innerHTML = `<span>Текущая точка</span><strong>Неделя ${String(week).padStart(2, '0')}</strong><small>${state.startDate ? weekData.title : 'Задай дату старта или начинай сейчас'}</small>`;
}

function setupFilters() {
  const categories = [...new Set(allTasks.map(task => task.c))].sort((a, b) => a.localeCompare(b, 'ru'));
  el('categoryFilter').innerHTML = '<option value="all">Все навыки</option>' + categories.map(category => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join('');
  el('categoryFilter').value = state.category;
  el('searchInput').value = state.query;
  el('pendingOnly').checked = state.pendingOnly;
  el('startDate').value = state.startDate;
  el('heroPythonCount').textContent = allTasks.filter(task => task.c === 'Python').length;
}

function renderTabs() {
  const tabs = [{ id: 'all', title: 'Все этапы' }, ...phases.map(phase => ({ id: String(phase.id), title: `${phase.id}. ${phase.title}` }))];
  el('phaseTabs').innerHTML = tabs.map(tab => `<button data-phase="${tab.id}" class="${String(state.phase) === tab.id ? 'active' : ''}">${escapeHtml(tab.title)}</button>`).join('');
}

function matchesTask(task, week) {
  const query = state.query.trim().toLocaleLowerCase('ru');
  const guideText = WEEK_GUIDES[week.week] ? JSON.stringify(WEEK_GUIDES[week.week]) : '';
  const haystack = `${task.t} ${task.d} ${task.c} ${week.title} ${week.outcome} ${guideText}`.toLocaleLowerCase('ru');
  if (query && !haystack.includes(query)) return false;
  if (state.category !== 'all' && task.c !== state.category) return false;
  if (state.pendingOnly && state.done.includes(task.id)) return false;
  return true;
}

function renderRoadmap() {
  let resultCount = 0;
  const activeWeek = currentWeek();
  roadmapContent.innerHTML = phases
    .filter(phase => state.phase === 'all' || String(phase.id) === String(state.phase))
    .map(phase => {
      const weeks = phase.items.map(week => {
        const tasks = week.tasks.map((task, index) => ({ ...task, id: taskId(week.week, index) })).filter(task => matchesTask(task, week));
        if (!tasks.length) return '';
        resultCount += tasks.length;
        const totalDone = week.tasks.filter((_, index) => state.done.includes(taskId(week.week, index))).length;
        const autoOpen = week.week === activeWeek || state.query || state.category !== 'all' || state.pendingOnly;
        const taskHtml = tasks.map(task => {
          const isDone = state.done.includes(task.id);
          return `<div class="task ${isDone ? 'is-done' : ''}">
            <button class="task-check" data-task="${task.id}" aria-pressed="${isDone}" aria-label="${isDone ? 'Вернуть' : 'Завершить'} задачу: ${escapeHtml(task.t)}">${isDone ? '✓' : ''}</button>
            <div class="task-copy"><strong>${escapeHtml(task.t)}</strong><span>${escapeHtml(task.d)}</span></div>
            <span class="tag">${escapeHtml(task.c)}</span>
          </div>`;
        }).join('');
        const lessonFile = LESSONS[week.week];
        const lessonLink = lessonFile
          ? `
            <a
              class="lesson-button"
              href="lesson.html?file=${encodeURIComponent(lessonFile)}"
            >
              Читать подробный урок →
            </a>
          `
          : "";
        const links = week.links.map(key => `<a href="${RESOURCES[key].url}" target="_blank" rel="noopener noreferrer">${escapeHtml(RESOURCES[key].title)} ↗</a>`).join('');
        const guide = WEEK_GUIDES[week.week];
        const guideHtml = guide ? `<div class="week-guide">
          <div class="guide-header"><span>Пошаговый план недели</span><span>${escapeHtml(guide.time)}</span></div>
          <div class="guide-columns">
            <div class="guide-plan"><b>Делай по порядку</b><ol>${guide.steps.map(step => `<li>${escapeHtml(step)}</li>`).join('')}</ol></div>
            <div class="guide-side">
              <div class="mastery-box"><b>Проверь себя без подсказок</b><ul>${guide.checks.map(check => `<li>${escapeHtml(check)}</li>`).join('')}</ul></div>
              <div class="deliverable-box"><b>Сдать в конце недели</b><strong>${escapeHtml(guide.artifact)}</strong><small>${escapeHtml(guide.hint)}</small></div>
            </div>
          </div>
        </div>` : '';
        return `<details class="week-card" data-week="${week.week}" ${autoOpen ? 'open' : ''}>
          <summary>
            <span class="week-no">W${String(week.week).padStart(2, '0')}</span>
            <span class="week-title"><strong>${escapeHtml(week.title)}${[11, 12, 21].includes(week.week) ? '<i class="modern-badge">актуально 2026</i>' : ''}</strong><span>${escapeHtml(week.outcome)}</span></span>
            <span class="week-progress">${totalDone} / ${week.tasks.length}</span><span class="chevron">+</span>
          </summary>
          <div class="week-body">
            <div class="week-outcome"><b>Результат</b><span>${escapeHtml(week.outcome)}</span></div>
            ${lessonLink}
            ${guideHtml}
            <div class="task-list">${taskHtml}</div>
            <div class="week-notes"><label><span>Заметки и доказательства</span><span>сохраняются автоматически</span></label><textarea data-note="${week.week}" placeholder="Команды, ошибки, ссылки на свои файлы, что повторить…">${escapeHtml(state.notes[week.week] || '')}</textarea></div>
            <div class="week-links">${links}</div>
          </div>
        </details>`;
      }).join('');
      if (!weeks) return '';
      return `<section class="phase-block" id="phase-${phase.id}">
        <div class="phase-title"><div><span class="phase-kicker">Фаза ${String(phase.id).padStart(2, '0')} · недели ${phase.weeks}</span><h3>${escapeHtml(phase.title)}</h3></div><p>${escapeHtml(phase.desc)}</p></div>
        ${weeks}
      </section>`;
    }).join('');
  el('emptyState').hidden = resultCount > 0;
  updateProgress();
}

function renderResources() {
  el('resourceGrid').innerHTML = Object.values(RESOURCES).map(resource => `<a class="resource-card" href="${resource.url}" target="_blank" rel="noopener noreferrer"><span>${escapeHtml(resource.label)}</span><strong>${escapeHtml(resource.title)}</strong><p>${escapeHtml(resource.desc)}</p><b>↗</b></a>`).join('');
}

function renderAll() {
  renderTabs();
  renderRoadmap();
}

function showToast(message) {
  const toast = el('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function exportProgress() {
  const payload = { app: 'REDPATH', version: 2, exportedAt: new Date().toISOString(), state };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `redpath-progress-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
  showToast('Прогресс экспортирован');
}

roadmapContent.addEventListener('click', event => {
  const button = event.target.closest('[data-task]');
  if (!button) return;
  const id = button.dataset.task;
  state.done = state.done.includes(id) ? state.done.filter(item => item !== id) : [...state.done, id];
  saveState();
  renderRoadmap();
});

roadmapContent.addEventListener('input', event => {
  const textarea = event.target.closest('[data-note]');
  if (!textarea) return;
  state.notes[textarea.dataset.note] = textarea.value;
  saveState();
});

el('phaseTabs').addEventListener('click', event => {
  const button = event.target.closest('[data-phase]');
  if (!button) return;
  state.phase = button.dataset.phase;
  saveState();
  renderAll();
});

el('searchInput').addEventListener('input', event => { state.query = event.target.value; saveState(); renderRoadmap(); });
el('categoryFilter').addEventListener('change', event => { state.category = event.target.value; saveState(); renderRoadmap(); });
el('pendingOnly').addEventListener('change', event => { state.pendingOnly = event.target.checked; saveState(); renderRoadmap(); });
el('startDate').addEventListener('change', event => { state.startDate = event.target.value; saveState(); renderRoadmap(); showToast('Дата старта сохранена'); });
el('exportBtn').addEventListener('click', exportProgress);
el('exportTop').addEventListener('click', exportProgress);

el('importFile').addEventListener('change', async event => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const parsed = JSON.parse(await file.text());
    const imported = parsed.state || parsed;
    state = {
      ...defaultState,
      ...imported,
      done: Array.isArray(imported.done) ? imported.done.filter(id => allTasks.some(task => task.id === id)) : [],
      notes: imported.notes && typeof imported.notes === 'object' ? imported.notes : {}
    };
    saveState();
    setupFilters();
    renderAll();
    showToast('Прогресс импортирован');
  } catch {
    showToast('Не удалось прочитать файл прогресса');
  }
  event.target.value = '';
});

el('resetBtn').addEventListener('click', () => {
  if (!window.confirm('Удалить весь прогресс, заметки и дату старта из этого браузера?')) return;
  state = { ...defaultState, notes: {}, done: [] };
  saveState();
  setupFilters();
  renderAll();
  showToast('Прогресс сброшен');
});

setupFilters();
renderResources();
renderAll();
