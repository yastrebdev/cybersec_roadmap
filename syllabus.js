const WEEK_GUIDES = {
  1: {
    time: '2ч теория · 3ч настройка · 2ч Linux · 2ч Python',
    steps: [
      'Создай папку курса: notes, scans, evidence, reports, scripts. Веди один journal.md с датой и временем каждого занятия.',
      'Установи VirtualBox/VMware, создай рабочую Linux VM и намеренно уязвимую VM. Выбери host-only/NAT, проверь, что цель недоступна из чужой сети.',
      'Сделай snapshots «clean» и «configured». Запиши IP, ОС, учётные записи, назначение машины и способ восстановления.',
      'Повтори 25 базовых команд Linux: навигация, права, процессы, службы, сеть, поиск, пайпы и SSH. Для каждой сохрани собственный пример.',
      'Напиши log-summary.py через argparse/pathlib, добавь --help, обработку отсутствующего файла и экспорт JSON.'
    ],
    checks: ['Без подсказки объяснить NAT, bridged и host-only.', 'Восстановить VM из snapshot.', 'Запустить Python-скрипт на корректном и повреждённом входе.'],
    artifact: 'Схема лаборатории + scope.md + первый CLI-скрипт',
    hint: 'Не ставь Kali основной системой: сначала используй VM.'
  },
  2: {
    time: '2ч теория · 4ч пакеты · 2ч Python · 1ч повторение',
    steps: [
      'Нарисуй путь пакета: приложение → DNS → ARP/шлюз → TCP/UDP → TLS → сервер. Подпиши адреса и порты.',
      'Реши 15 задач по CIDR: адрес сети, broadcast, диапазон хостов и принадлежность IP подсети.',
      'Сними в Wireshark собственные DNS-запрос, TCP handshake, HTTP-запрос и TLS handshake; сохрани четыре фильтра.',
      'Диагностируй три искусственные ошибки: неверный DNS, закрытый порт и отсутствующий маршрут. Для каждой назови уровень проблемы.',
      'Напиши порт-чекер только для своей VM: таймаут, диапазон, ограничение параллелизма, JSON-результат и явный scope.'
    ],
    checks: ['По дампу восстановить последовательность TCP.', 'Объяснить разницу DNS, ARP и маршрутизации.', 'Предсказать результат соединения до запуска инструмента.'],
    artifact: 'network-basics.md + pcap с аннотациями + port-check.py',
    hint: 'Инструмент считается понятым, если ты можешь объяснить пакеты, которые он создаёт.'
  },
  3: {
    time: '2ч теория · 4ч Linux labs · 2ч Python · 1ч конспект',
    steps: [
      'Создай пользователей и группы; потренируй chmod, chown, umask, sudo и ACL на тестовых файлах.',
      'Найди процессы, listening sockets, systemd units, cron jobs, логи входов и открытые файлы процесса.',
      'Разбери SUID/SGID, Linux capabilities и PATH на безопасных локальных примерах без эксплуатации реальной системы.',
      'Пройди Bandit 0–10. После каждого уровня закрой решение и воспроизведи его по собственному объяснению.',
      'Напиши parser auth.log: группировка по IP/пользователю, временное окно, CSV и unit tests на 3 фикстурах.'
    ],
    checks: ['Объяснить effective UID и обычные права.', 'Найти, какой процесс слушает заданный порт.', 'Распознать 5 неуспешных входов в логе.'],
    artifact: 'Linux-enum чек-лист + Bandit notes + auth-log-parser',
    hint: 'Не запоминай команды списком: связывай каждую с вопросом, на который она отвечает.'
  },
  4: {
    time: '2ч методология · 4ч аудит · 2ч отчёт · 1ч разбор',
    steps: [
      'Напиши Rules of Engagement: цели, исключения, окна, лимиты, контакты, обработка данных и emergency stop.',
      'Составь test plan: passive recon, discovery, enumeration, validation, cleanup, retest и reporting.',
      'Проинвентаризируй лабораторию, вручную подтверди найденные сервисы и сформулируй гипотезы без эксплуатации.',
      'Проверь одну намеренную слабую конфигурацию минимальным действием; сохрани timestamp, request/command и результат.',
      'Напиши отчёт на 2–4 страницы и отдай себе на «retest»: способен ли другой человек повторить проверку по тексту.'
    ],
    checks: ['Различить vuln scan и pentest.', 'Назвать критерий остановки теста.', 'Отделить факт, гипотезу и риск.'],
    artifact: 'RoE + test plan + mini-report-v1.pdf/md',
    hint: 'Пентест без scope и отчёта — не профессиональный пентест.'
  },
  5: {
    time: '3ч теория · 3ч ручной HTTP · 2ч Python · 1ч quiz',
    steps: [
      'Разбери request line, headers, body, response, cookies, caching, content negotiation и TLS на собственном backend.',
      'Проследи один запрос через reverse proxy/app/database и нарисуй границы доверия.',
      'Сделай руками GET, POST, multipart и JSON-запросы через curl; измени метод, content-type, cookie и параметр.',
      'Разбери SOP, CORS, CSP, SameSite и preflight; для каждого дай один сценарий защиты и одну ошибку конфигурации.',
      'Напиши HTTP-inspector с allowlist хостов, таймаутом, redirect limit и выводом headers/TLS metadata.'
    ],
    checks: ['Вручную собрать валидный HTTP-запрос.', 'Объяснить, где хранится состояние сессии.', 'Отличить origin от site.'],
    artifact: 'Схема web-stack + HTTP cheat sheet + http-inspector.py',
    hint: 'Если HTTP непонятен без Burp, к уязвимостям переходить рано.'
  },
  6: {
    time: '1.5ч настройка · 5ч labs · 1.5ч заметки · 1ч повтор',
    steps: [
      'Создай отдельный браузерный профиль, настрой Burp CA только в нём и проверь перехват своего трафика.',
      'Освой Target, Proxy history, Repeater, Decoder, Comparer и Intruder Community; выпиши назначение каждого.',
      'Пройди PortSwigger Getting Started и перехвати login, state-changing request и API request.',
      'Для пяти запросов сделай: baseline → одна мутация → сравнение → вывод. Не меняй несколько факторов одновременно.',
      'Создай шаблон evidence: URL, роль, precondition, raw request, raw response, observation, impact, cleanup.'
    ],
    checks: ['Повторить запрос без браузера.', 'Объяснить отличие proxy и repeater.', 'Восстановить полную сессию из истории.'],
    artifact: 'Burp workspace + 5 карточек HTTP evidence',
    hint: 'Каждая гипотеза должна иметь baseline и ровно одно контролируемое изменение.'
  },
  7: {
    time: '2ч методика · 4ч recon · 2ч Python · 1ч карта',
    steps: [
      'Раздели passive и active recon; для активной части задай rate limit, scope allowlist и журнал запросов.',
      'Собери DNS, headers, технологии, robots/sitemap, JS endpoints, формы, параметры, роли и виртуальные хосты учебной цели.',
      'Вручную пройди приложение под каждой ролью и построй таблицу endpoint × method × role × object × input.',
      'Запусти content discovery только на своей лаборатории; проверь каждый интересный результат вручную.',
      'Напиши URL-normalizer: canonical form, дедупликация, same-domain filter, query parameter inventory и CSV.'
    ],
    checks: ['Назвать поверхность атаки без запуска сканера.', 'Отделить endpoint от функции бизнеса.', 'Доказать, что URL остаётся внутри scope.'],
    artifact: 'attack-surface.csv + diagram + url-normalizer.py',
    hint: 'Хорошее картирование часто даёт больше находок, чем ранний поиск payload-ов.'
  },
  8: {
    time: '2.5ч теория · 5ч labs · 1ч отчёт · 0.5ч review',
    steps: [
      'На локальном приложении проследи небезопасную строковую SQL-сборку и исправь её параметризованным запросом.',
      'Разбери error, UNION, boolean и time-based SQLi как способы получить доказательство при разных каналах ответа.',
      'Разбери command injection: data vs shell syntax, опасность shell=True и безопасные API без shell.',
      'Реши 4–6 SQLi и 2 command injection apprentice labs; для каждой укажи context, signal и root cause.',
      'Оформи две находки: минимальный PoC, impact, CWE/ASVS-ссылка, исправление и шаг retest.'
    ],
    checks: ['Объяснить SQLi без слова «кавычка».', 'Выбрать технику для blind response.', 'Показать исправление в коде.'],
    artifact: '6–8 lab notes + vulnerable/fixed code diff + 2 findings',
    hint: 'Цель — понять разделение кода и данных, а не коллекционировать payload-ы.'
  },
  9: {
    time: '2ч модель · 5ч labs · 1ч automation · 1ч report',
    steps: [
      'Опиши flows регистрации, login, reset, MFA, смены email/password, logout и session rotation.',
      'Построй матрицу ролей и объектов: anonymous/user/admin × read/create/update/delete × own/other.',
      'Проверь horizontal/vertical access и object/function authorization только на учебных учетных записях.',
      'Реши минимум 3 auth и 4 access-control labs, включая IDOR и multi-step flow.',
      'Напиши response-diff для сравнения status, length, location и нормализованного тела двух разрешённых запросов.'
    ],
    checks: ['Отличить authentication, authorization и session.', 'Найти server-side контроль, а не UI-ограничение.', 'Построить негативный тест из бизнес-правила.'],
    artifact: 'Role matrix + 7 lab notes + response-diff.py',
    hint: 'Broken access control — не отдельный payload, а нарушение серверного правила.'
  },
  10: {
    time: '2ч браузер · 5ч labs · 1ч схема · 1ч review',
    steps: [
      'Для XSS выпиши source, transform, sink и execution context; различай reflected, stored и DOM-based.',
      'Для CSRF проследи автоматическую отправку cookies и проверь token, SameSite, Origin/Referer.',
      'Для CORS построй таблицу Origin, ACAO, credentials и preflight; объясни, что проверяет браузер.',
      'Реши 4 XSS, 2 CSRF и 1 CORS lab начального уровня; после решения воспроизведи без walkthrough.',
      'Сопоставь защиту: contextual encoding, safe DOM APIs, CSP, SameSite, CSRF token и strict CORS allowlist.'
    ],
    checks: ['Определить XSS context по фрагменту HTML/JS.', 'Объяснить, почему CORS не auth.', 'Выбрать корректное encoding по контексту.'],
    artifact: 'Browser security map + 7 lab notes + defense matrix',
    hint: 'Не смешивай XSS, CSRF и CORS: у них разные нарушенные границы доверия.'
  },
  11: {
    time: '2.5ч теория · 5ч labs · 1.5ч Python',
    steps: [
      'Разбери path canonicalization, upload pipeline, server-side fetch, XML parsing, template rendering и serialization boundaries.',
      'Для каждой функции найди attacker-controlled input, привилегированный sink и сетевую/файловую границу.',
      'Реши по одному базовому lab для traversal, upload, SSRF и XXE; SSTI/deserialization пройди как guided exposure.',
      'Составь defense matrix: allowlist, canonical path, random storage name, egress control, safe parser/template и type-safe serialization.',
      'Напиши безопасный artifact handler: size/type/name controls, SHA-256, quarantine directory и metadata JSON.'
    ],
    checks: ['Объяснить SSRF через trust boundary.', 'Различить file extension и реальный content.', 'Показать, где возникает unsafe deserialization.'],
    artifact: 'Server-side sinks map + 4 core labs + artifact-handler.py',
    hint: 'SSTI и deserialization здесь — знакомство; углубляй после уверенного владения core web.'
  },
  12: {
    time: '3ч API/OAuth · 4ч labs · 1ч modern survey · 1ч report',
    steps: [
      'Импортируй OpenAPI-схему учебного API и составь inventory объектов, операций, ролей, свойств и resource limits.',
      'Проверь BOLA/BFLA, property authorization, mass assignment, excessive data, rate/resource limits и unsafe downstream consumption.',
      'Разбери JWT validation и OAuth/OIDC flow: issuer, audience, redirect URI, state/nonce, PKCE и server-side access control.',
      'Выполни минимум 3 API, 1 JWT и 1 GraphQL lab. Сделай обзор WebSockets, NoSQLi, race conditions, cache issues и LLM-connected APIs.',
      'Сопоставь результаты с OWASP API Top 10 и ASVS 5.0; оформи мини-аудит с тремя качественными findings.'
    ],
    checks: ['Отличить object и function authorization.', 'Объяснить, что JWT подпись не шифрует payload.', 'Нарисовать OAuth authorization-code flow.'],
    artifact: 'API inventory + 5 lab notes + mini API report',
    hint: 'Advanced web темы отмечай в backlog; базу подтверждай лабораторией и root cause.'
  },
  13: {
    time: '2ч стратегия · 4ч scanning · 2ч validation · 1ч Python',
    steps: [
      'Сначала создай host list и ожидаемую схему сети; затем выбери discovery, TCP и ограниченный UDP plan.',
      'Запусти Nmap по этапам: discovery → common ports → full TCP по активным хостам → version detection → безопасные scripts.',
      'Сравни scanner output с ручным banner/protocol check; пометь confidence и false positives.',
      'Выполни безопасный vulnerability scan локальной цели, отдели CVE match от доказанной применимости.',
      'Напиши Nmap XML parser и сформируй service matrix с приоритетом дальнейшей проверки.'
    ],
    checks: ['Обосновать каждый флаг сканирования.', 'Объяснить, почему версия может быть ошибочной.', 'Отделить exposure, weakness и exploitable vulnerability.'],
    artifact: 'Scan plan + raw XML + service matrix + parser',
    hint: 'Сканирование — сбор данных. Вывод о риске появляется только после валидации.'
  },
  14: {
    time: '2ч протоколы · 4ч enum · 2ч password lab · 1ч notes',
    steps: [
      'Для SMB, SSH, FTP, DNS, SMTP, SNMP и базы данных выпиши handshake, authentication и ключевые объекты перечисления.',
      'На своей лаборатории проверь anonymous/default access, permissions, version disclosure, shares, zones и service-specific metadata.',
      'Создай тестовый hash и изучи online vs offline guessing, wordlists, mutations, lockout и rate limiting без атак на чужие аккаунты.',
      'Отработай file transfer между своими Linux/Windows VM штатными HTTP/SMB/SSH средствами и проверь SHA-256.',
      'Собери checklist «service → questions → commands/tools → evidence → safe stop».'
    ],
    checks: ['Начать enum незнакомого сервиса с документации.', 'Объяснить риск password spraying и lockout.', 'Проверить целостность переданного файла.'],
    artifact: 'Common-services playbook + password lab notes + evidence pack',
    hint: 'Не запускай всё подряд: сначала пойми протокол и сформулируй вопрос.'
  },
  15: {
    time: '2ч research · 4ч lab · 2ч shells · 1ч remediation',
    steps: [
      'Возьми одну точную версию ПО: найди vendor advisory/CVE, условия эксплуатации, affected/fixed versions и mitigations.',
      'Прочитай публичный exploit как код: входы, hardcoded значения, побочные эффекты, сеть и cleanup. Не запускай до понимания.',
      'В безопасной VM сравни manual verification и Metasploit; сохрани, что framework автоматизировал и что скрыл.',
      'Разбери bind/reverse shell, TTY upgrade и payload architecture концептуально; используй только внутри изолированной сети.',
      'Заверши минимальным proof, cleanup, remediation и retest — без persistence и обхода защит вне явного scope.'
    ],
    checks: ['Доказать применимость CVE к конфигурации.', 'Предсказать side effects exploit-кода.', 'Объяснить различие shell, payload и session.'],
    artifact: 'Exploit research worksheet + lab evidence + remediation note',
    hint: 'Публичный exploit — недоверенный код. Сначала читай, затем изолируй, только потом запускай.'
  },
  16: {
    time: '2ч enum · 5ч labs · 1ч Python · 1ч report',
    steps: [
      'В Linux собери manual enum: identity, sudo, SUID/capabilities, cron, services, writable paths, mounts, secrets и kernel.',
      'В Windows собери manual enum: identity/tokens, groups, services, tasks, ACL, registry, credentials, patches и network.',
      'Только после manual pass сравни результат с automation scripts; объясни каждую полезную строку.',
      'Пройди один Linux и один Windows privilege-escalation lab, восстанови snapshot и повтори путь без подсказок.',
      'Напиши read-only fact collector с JSON, platform detection, logging и тестами.'
    ],
    checks: ['Отличить misconfiguration от kernel exploit.', 'Назвать required privileges каждого шага.', 'Предложить точное исправление и retest.'],
    artifact: 'Два manual checklists + 2 lab write-ups + fact-collector',
    hint: 'Automation ищет кандидатов; решение о пути повышения привилегий принимаешь ты.'
  },
  17: {
    time: '3ч AD theory · 3ч lab build · 2ч observation · 1ч diagram',
    steps: [
      'Разверни изолированный DC и workstation, создай OU, users, groups, service account и GPO; сделай clean snapshots.',
      'Нарисуй domain/forest, DNS, LDAP, Kerberos, NTLM, SMB и Group Policy как связанные сервисы.',
      'Проследи domain logon и доступ к service: TGT, TGS, SPN, ticket cache, SID и access token.',
      'Создай безопасные misconfigurations для будущих недель и документируй точную ожидаемую слабость.',
      'Включи нужный аудит и посмотри события входа/выдачи tickets в журналах Windows.'
    ],
    checks: ['Объяснить SID, ACL, ACE и security principal.', 'Отличить Kerberos от NTLM.', 'Найти применённую GPO.'],
    artifact: 'AD lab diagram + object inventory + authentication sequence',
    hint: 'Без понимания Windows access model BloodHound превращается в набор цветных стрелок.'
  },
  18: {
    time: '2ч sources · 5ч enumeration · 1ч Python · 1ч verification',
    steps: [
      'Собери baseline текущего пользователя: token, groups, privileges, host, domain, DNS и network context.',
      'Перечисли users, groups, computers, SPNs, sessions, local admins, shares, GPO, trusts и ACL штатными средствами.',
      'Собери разрешённый граф отношений и для каждого интересного edge найди первичный LDAP/ACL факт.',
      'Сформулируй 3 attack-path hypotheses и вручную подтверди prerequisites без эксплуатации.',
      'Напиши CSV analyzer: nested groups, privileged membership, SPNs, duplicates и Markdown summary.'
    ],
    checks: ['Назвать источник каждого факта в графе.', 'Отличить direct и transitive membership.', 'Объяснить потенциальный путь словами.'],
    artifact: 'AD enumeration workbook + verified graph + csv-analyzer.py',
    hint: 'Граф показывает возможные отношения; он не доказывает, что путь реально работает.'
  },
  19: {
    time: '3ч auth · 4ч labs · 1ч detection · 1ч report',
    steps: [
      'Для AS-REP roasting и Kerberoasting выпиши prerequisite, получаемый материал, offline step, impact и mitigation.',
      'Разбери NTLM hash use, relay prerequisites, signing/channel binding и разницу с password cracking.',
      'Разбери delegation и credential exposure как отдельные классы, не смешивая их в одну «AD-атаку».',
      'Отработай три заранее подготовленных сценария в своём домене, после каждого восстанови snapshot.',
      'Для каждого сценария добавь Windows event/log source, preventive control и точный retest.'
    ],
    checks: ['До запуска назвать обязательные условия техники.', 'Объяснить online и offline risk.', 'Связать finding с конфигурацией, а не инструментом.'],
    artifact: '3 AD findings с root cause, detection и remediation',
    hint: 'Учись разрывать attack path защитным контролем — это улучшает и эксплуатацию, и отчёт.'
  },
  20: {
    time: '2ч routing · 4ч tunnel lab · 2ч assessment · 1ч report',
    steps: [
      'Создай два сегмента: attacker видит jump host, но не внутреннюю цель. Нарисуй routing table до туннеля.',
      'По очереди отработай local/remote port forwarding и SOCKS proxy в своей лаборатории.',
      'Проверь DNS resolution, tool proxy settings, маршруты и журнал соединений; избегай случайного выхода из scope.',
      'Проведи мини internal assessment: enum → foothold hypothesis → pivot → internal validation → cleanup.',
      'Напиши attack-path diagram с условием, evidence, риском и контролем для каждого шага.'
    ],
    checks: ['Предсказать маршрут соединения через туннель.', 'Отличить forwarding, proxy и VPN.', 'Доказать cleanup и отсутствие persistence.'],
    artifact: 'Двухсегментная lab + tunnel cheatsheet + internal report v1',
    hint: 'Перед каждым запросом через pivot мысленно отвечай: откуда он выйдет и куда попадёт.'
  },
  21: {
    time: '2ч cloud/IAM · 3ч containers · 2ч supply chain · 2ч lab',
    steps: [
      'Разбери shared-responsibility, tenant/account/project, IAM user/role/policy, temporary credentials и least privilege.',
      'Запусти собственный контейнер и исследуй image, layers, user, mounts, environment, capabilities и network namespace.',
      'Создай безопасный пример misconfiguration: секрет в env/image, root container, лишний mount или чрезмерная IAM policy; затем исправь.',
      'Разбери OWASP Top 10:2025 supply-chain failures: dependencies, lockfiles, provenance, CI secrets и artifact integrity.',
      'Сделай threat map «developer → repository → CI → registry → runtime → cloud IAM» и отметь trust boundaries.'
    ],
    checks: ['Объяснить, почему контейнер не равен VM.', 'Прочитать простую IAM policy.', 'Назвать путь утечки секрета через build chain.'],
    artifact: 'Cloud/container threat map + vulnerable/fixed lab diff',
    hint: 'За неделю нужна грамотная база и язык понятий, а не обещание «уметь пентестить любой cloud».'
  },
  22: {
    time: '2ч engineering · 5ч implementation · 1ч tests · 1ч docs',
    steps: [
      'Спроектируй CLI pipeline: input adapters → normalization → scoped enrichment → findings/evidence → output adapters.',
      'Добавь venv/packaging, typing, dataclasses, exceptions, structured logging, config и secrets через environment.',
      'Реализуй scope allowlist, dry-run, timeout, bounded concurrency, rate limit, retry policy и redaction.',
      'Импортируй Nmap XML/CSV, собери только безопасные HTTP metadata и создай JSON + Markdown report.',
      'Напиши unit tests и integration test на локальном fixture server; оформи README, threat model и limitations.'
    ],
    checks: ['Сломать плохим input без аварийного завершения.', 'Доказать, что out-of-scope host блокируется.', 'Повторить одинаковый результат на fixture.'],
    artifact: 'Versioned asset-enrichment CLI с tests и README',
    hint: 'Хороший security tool предсказуем, ограничен scope и оставляет понятный audit trail.'
  },
  23: {
    time: '1ч planning · 6ч web audit · 2ч report',
    steps: [
      'Выбери незнакомое учебное приложение, задай scope, роли, test data, лимиты и 6-часовой таймбокс.',
      'Проведи mapping и test plan по WSTG/ASVS: config, auth, session, access, input, business logic, client, API.',
      'Не используй названия задач как подсказку: работай через assets, trust boundaries, hypotheses и controlled mutations.',
      'Повторно проверь каждый candidate, убери false positives, сохрани минимальное evidence и проведи cleanup.',
      'Напиши executive + technical report и через сутки выполни blind retest по собственным шагам.'
    ],
    checks: ['Провести 30 минут без tool-hopping.', 'Обосновать coverage, а не только находки.', 'Дать разработчику проверяемое исправление.'],
    artifact: 'Полный web pentest package: scope, notes, evidence, report, retest',
    hint: 'Успех капстоуна измеряется качеством процесса и coverage, не количеством критических находок.'
  },
  24: {
    time: '1ч planning · 5ч internal audit · 2ч report · 1ч roadmap',
    steps: [
      'Проведи blind internal assessment собственной сети: host/service enum, credentials policy, Windows/AD и segmentation.',
      'Проверь одну безопасную цепочку end-to-end: initial condition → privilege/path → business impact → cleanup.',
      'Исправь одну конфигурацию и выполни retest, доказывающий, что прежняя цепочка разорвана.',
      'Собери обезличенное портфолио: Python tool, web report, internal report, diagram и один technical write-up.',
      'Оцени 7 доменов по доказательствам 1–5 и составь 90-дневный план специализации с недельными метриками.'
    ],
    checks: ['Самостоятельно выбрать следующий тест.', 'Объяснить всю цепочку технической и нетехнической аудитории.', 'Назвать пробелы без самообмана.'],
    artifact: 'Internal pentest package + portfolio + evidence-based 90-day plan',
    hint: 'После этой недели ты должен уметь провести учебный аудит сам, но всё ещё работать под ревью на реальном проекте.'
  }
};
