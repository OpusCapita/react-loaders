### Synopsis

**serviceComponent** is a function which allow to load **specified component** from **specified service** and render it.

`serviceComponent(service, componentName) => LoadedComponent`

### LoadedComponent props

You can pass any **specified component** properties

LoadedComponent required several additional props

| Name                           | Type                    | Description                                                                                                                      |
| ------------------------------ | :---------------------- | -----------------------------------------------------------                                                                      |
| loadWith                       | func                    | *serviceRegistry* function. Components will be loaded by convention address  `service.url/static/components/${componentName}.js` |
| inProgress                     | node                    | Spinner element. Will be shown while component not loaded yet.                                                                   |
  
### Code Example

```
<div>
{(() => {
// Example start

  let CustomerInput = serviceComponent('customer', 'CustomerInput');

  let serviceRegistry = (service) => ({ url: 'http://localhost:3000' });
  
  return (
    <CustomerInput
      serviceRegistry={serviceRegistry}
      loadWith={serviceRegistry}
      value={{}}
      onChange={() => console.log('onChange!')}
      disabled={false}
    />
  );
  
// Example end
})()}
</div>
```

### Component Name

serviceComponent

### License

Licensed by © 2017 OpusCapita
