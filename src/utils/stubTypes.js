export const STUB_TYPES = [
    { key: 'controller',        subDir: 'Http/Controllers',         suffix: 'Controller' },
    { key: 'model',             subDir: 'Models',                   suffix: '' },
    { key: 'service',           subDir: 'Services',                 suffix: 'Service' },
    { key: 'resource',          subDir: 'Http/Resources',           suffix: 'Resource' },
    { key: 'request',           subDir: 'Http/Requests',            suffix: 'Request' },
    { key: 'provider',          subDir: 'Providers',                suffix: 'ServiceProvider' },
    { key: 'policy',            subDir: 'Policies',                 suffix: 'Policy' },
    { key: 'dto',               subDir: 'DTOs',                     suffix: 'DTO' },
    { key: 'test',              subDir: 'Tests',                    suffix: 'Test' },
    { key: 'seeder',            subDir: 'Database/Seeders',         suffix: '' },
    { key: 'migration',         subDir: 'Database/Migrations',      suffix: '' },
    { key: 'value_object',      subDir: 'Domain/ValueObjects',      suffix: '' },
    { key: 'sub_component',     subDir: 'Domain/SubComponents',     suffix: '' },
];

STUB_TYPES.get = function(key) {
    return this.find(item => item.key === key) || null;
};

STUB_TYPES.forEach(item => {
    STUB_TYPES[item.key] = item;
});