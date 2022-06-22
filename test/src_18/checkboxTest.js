describe('React 18 rendering test', function () {
    let component;

    before(async function () {
        component = await browser.mountComponent('/test/components/Checkbox.jsx');
    });

    it('should render a functional component without error', async function () {
        await browser.expect(component).to.be.visible;
    });
});