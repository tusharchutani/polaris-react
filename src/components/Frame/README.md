---
name: Frame
category: Structure
keywords:
  - navigation
  - nav
  - links
  - primary navigation
  - main navigation
  - global
  - frame
  - sidebar
  - side bar
  - loading
  - top bar
  - menu
  - toast
fullSizeExamples: true
---

# Frame

The frame component, while not visible in the user interface itself, provides the structure for any non-embedded application. It wraps the main elements and houses the primary [navigation](/components/navigation/navigation), [top bar](/components/structure/top-bar), [toast](/components/feedback-indicators/toast), and [contextual save bar](/components/forms/contextual-save-bar) components.

---

## Best practices

For the best experience when creating an application frame, use the following components:

- [Top bar](/components/structure/top-bar)
- [Navigation](/components/navigation/navigation)
- [Contextual save bar](/components/forms/contextual-save-bar)
- [Toast](/components/feedback-indicators/toast)
- [Loading](/components/feedback-indicators/loading)

---

## Examples

### Frame in a stand-alone application

Use to present the frame structure and all of its elements.

```jsx
class FrameExample extends React.Component {
  defaultState = {
    emailFieldValue: 'dharma@jadedpixel.com',
    nameFieldValue: 'Jaded Pixel',
  };

  state = {
    showToast: false,
    isLoading: false,
    isDirty: false,
    searchActive: false,
    searchText: '',
    userMenuOpen: false,
    showMobileNavigation: false,
    modalActive: false,
    nameFieldValue: this.defaultState.nameFieldValue,
    emailFieldValue: this.defaultState.emailFieldValue,
    storeName: this.defaultState.nameFieldValue,
    supportSubject: '',
    supportMessage: '',
  };

  render() {
    const {
      showToast,
      isLoading,
      isDirty,
      searchActive,
      searchText,
      userMenuOpen,
      showMobileNavigation,
      nameFieldValue,
      emailFieldValue,
      modalActive,
      storeName,
    } = this.state;

    const toastMarkup = showToast ? (
      <Toast
        onDismiss={this.toggleState('showToast')}
        content="Changes saved"
      />
    ) : null;

    const userMenuActions = [
      {
        items: [{content: 'Community forums'}],
      },
    ];

    const navigationUserMenuMarkup = (
      <Navigation.UserMenu
        actions={userMenuActions}
        name="Dharma"
        detail={storeName}
        avatarInitials="D"
      />
    );

    const contextualSaveBarMarkup = isDirty ? (
      <ContextualSaveBar
        message="Unsaved changes"
        saveAction={{
          onAction: this.handleSave,
        }}
        discardAction={{
          onAction: this.handleDiscard,
        }}
      />
    ) : null;

    const userMenuMarkup = (
      <TopBar.UserMenu
        actions={userMenuActions}
        name="Dharma"
        detail={storeName}
        initials="D"
        open={userMenuOpen}
        onToggle={this.toggleState('userMenuOpen')}
      />
    );

    const searchResultsMarkup = (
      <Card>
        <ActionList
          items={[
            {content: 'Shopify help center'},
            {content: 'Community forums'},
          ]}
        />
      </Card>
    );

    const searchFieldMarkup = (
      <TopBar.SearchField
        onChange={this.handleSearchFieldChange}
        value={searchText}
        placeholder="Search"
      />
    );

    const topBarMarkup = (
      <TopBar
        showNavigationToggle={true}
        userMenu={userMenuMarkup}
        searchResultsVisible={searchActive}
        searchField={searchFieldMarkup}
        searchResults={searchResultsMarkup}
        onSearchResultsDismiss={this.handleSearchResultsDismiss}
        onNavigationToggle={this.toggleState('showMobileNavigation')}
      />
    );

    const navigationMarkup = (
      <Navigation location="/" userMenu={navigationUserMenuMarkup}>
        <Navigation.Section
          items={[
            {
              label: 'Back to Shopify',
              icon: 'arrowLeft',
            },
          ]}
        />
        <Navigation.Section
          separator
          title="Jaded Pixel App"
          items={[
            {
              label: 'Dashboard',
              icon: 'home',
              onClick: this.toggleState('isLoading'),
            },
            {
              label: 'Jaded Pixel Orders',
              icon: 'orders',
              onClick: this.toggleState('isLoading'),
            },
          ]}
          action={{
            icon: 'conversation',
            accessibilityLabel: 'Contact support',
            onClick: this.toggleState('modalActive'),
          }}
        />
      </Navigation>
    );

    const loadingMarkup = isLoading ? <Loading /> : null;

    const actualPageMarkup = (
      <Page title="Account">
        <Layout>
          <Layout.AnnotatedSection
            title="Account details"
            description="Jaded Pixel will use this as your account information."
          >
            <Card sectioned>
              <FormLayout>
                <TextField
                  label="Full name"
                  value={nameFieldValue}
                  onChange={this.handleNameFieldChange}
                />
                <TextField
                  type="email"
                  label="Email"
                  value={emailFieldValue}
                  onChange={this.handleEmailFieldChange}
                />
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
      </Page>
    );

    const loadingPageMarkup = (
      <SkeletonPage>
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={9} />
              </TextContainer>
            </Card>
          </Layout.Section>
        </Layout>
      </SkeletonPage>
    );

    const pageMarkup = isLoading ? loadingPageMarkup : actualPageMarkup;

    const modalMarkup = (
      <Modal
        open={modalActive}
        onClose={this.toggleState('modalActive')}
        title="Contact support"
        primaryAction={{
          content: 'Send',
          onAction: this.toggleState('modalActive'),
        }}
      >
        <Modal.Section>
          <FormLayout>
            <TextField
              label="Subject"
              value={this.state.supportSubject}
              onChange={this.handleSubjectChange}
            />
            <TextField
              label="Message"
              value={this.state.supportMessage}
              onChange={this.handleMessageChange}
              multiline
            />
          </FormLayout>
        </Modal.Section>
      </Modal>
    );

    const theme = {
      colors: {
        topBar: {
          background: '#357997',
        },
      },
      logo: {
        width: 124,
        topBarSource:
          'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
        contextualSaveBarSource:
          'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
        url: 'http://jadedpixel.com',
        accessibilityLabel: 'Jaded Pixel',
      },
    };

    return (
      <div style={{height: '500px'}}>
        <AppProvider theme={theme}>
          <Frame
            topBar={topBarMarkup}
            navigation={navigationMarkup}
            showMobileNavigation={showMobileNavigation}
            onNavigationDismiss={this.toggleState('showMobileNavigation')}
          >
            {contextualSaveBarMarkup}
            {loadingMarkup}
            {pageMarkup}
            {toastMarkup}
            {modalMarkup}
          </Frame>
        </AppProvider>
      </div>
    );
  }

  toggleState = (key) => {
    return () => {
      this.setState((prevState) => ({[key]: !prevState[key]}));
    };
  };

  handleSearchFieldChange = (value) => {
    this.setState({searchText: value});
    if (value.length > 0) {
      this.setState({searchActive: true});
    } else {
      this.setState({searchActive: false});
    }
  };

  handleSearchResultsDismiss = () => {
    this.setState(() => {
      return {
        searchActive: false,
        searchText: '',
      };
    });
  };

  handleEmailFieldChange = (emailFieldValue) => {
    this.setState({emailFieldValue});
    if (emailFieldValue != '') {
      this.setState({isDirty: true});
    }
  };

  handleNameFieldChange = (nameFieldValue) => {
    this.setState({nameFieldValue});
    if (nameFieldValue != '') {
      this.setState({isDirty: true});
    }
  };

  handleSave = () => {
    this.defaultState.nameFieldValue = this.state.nameFieldValue;
    this.defaultState.emailFieldValue = this.state.emailFieldValue;

    this.setState({
      isDirty: false,
      showToast: true,
      storeName: this.defaultState.nameFieldValue,
    });
  };

  handleDiscard = () => {
    this.setState({
      emailFieldValue: this.defaultState.emailFieldValue,
      nameFieldValue: this.defaultState.nameFieldValue,
      isDirty: false,
    });
  };

  handleSubjectChange = (supportSubject) => {
    this.setState({supportSubject});
  };

  handleMessageChange = (supportMessage) => {
    this.setState({supportMessage});
  };
}
```

### Frame in the Shopify admin

Use to present the frame structure and all of its elements in the context of the Shopify admin.

```jsx
class FrameExample extends React.Component {
  state = {
    navigationVisible: false,
    selectedItems: [],
  };

  render() {
    const {navigationVisible} = this.state;
    const activeLocation = window.location.href;

    const resourceName = {
      singular: 'customer',
      plural: 'customers',
    };

    const items = [
      {
        id: 341,
        url: 'customers/341',
        name: 'Mae Jemison',
        location: 'Decatur, USA',
      },
      {
        id: 256,
        url: 'customers/256',
        name: 'Ellen Ochoa',
        location: 'Los Angeles, USA',
      },
    ];

    const promotedBulkActions = [
      {
        content: 'Edit customers',
        onAction: () => console.log('Todo: implement bulk edit'),
      },
    ];

    const bulkActions = [
      {
        content: 'Add tags',
        onAction: () => console.log('Todo: implement bulk add tags'),
      },
      {
        content: 'Remove tags',
        onAction: () => console.log('Todo: implement bulk remove tags'),
      },
      {
        content: 'Delete customers',
        onAction: () => console.log('Todo: implement bulk delete'),
      },
    ];

    const userMenuMarkup = (
      <TopBar.UserMenu
        actions={[
          {
            items: [
              {content: 'Your profile', icon: 'profile'},
              {content: 'Log out', icon: 'logOut'},
            ],
          },
          {
            items: [
              {content: 'Shopify help center'},
              {content: 'Community forums'},
            ],
          },
        ]}
        name="Dharma"
        detail="Jaded Pixel"
        initials="D"
        open={false}
      />
    );

    const topBar = (
      <TopBar
        showNavigationToggle
        searchField={<TopBar.SearchField placeholder="Search" value="" />}
        onNavigationToggle={() => this.handleToggle()}
        userMenu={userMenuMarkup}
      />
    );

    const navUserMenu = (
      <Navigation.UserMenu
        actions={[
          {
            items: [
              {content: 'Your profile', icon: 'profile'},
              {content: 'Log out', icon: 'logOut'},
            ],
          },
          {
            items: [
              {content: 'Shopify help center'},
              {content: 'Community forums'},
            ],
          },
        ]}
        name="Dharma"
        detail="Jaded Pixel"
        initials="D"
        open={false}
      />
    );

    const navigationMarkup = (
      <Navigation
        location={activeLocation}
        onDismiss={() => this.handleDismiss()}
        userMenu={navUserMenu}
      >
        <Navigation.Section
          items={[
            {
              label: 'Home',
              icon: 'home',
            },
            {
              label: 'Orders',
              icon: 'orders',
              url: activeLocation,
            },
            {
              label: 'Products',
              icon: 'products',
            },
            // {
            //   label: 'Customers',
            //   icon: customers,
            // },
            // {
            //   label: 'Analytics',
            //   icon: analytics,
            // },
            // {
            //   label: 'Marketing',
            //   icon: marketing,
            // },
            // {
            //   label: 'Apps',
            //   icon: apps,
            // },
          ]}
        />
        <Navigation.Section
          fill
          title="Sales channels"
          items={[
            {
              label: 'Online Store',
              icon: 'onlineStore',
            },
          ]}
          separator
          action={{
            icon: 'circlePlusOutline',
            accessibilityLabel: 'Add a sales channel',
          }}
        />
        <Navigation.Section
          items={[
            {
              label: 'Settings',
              // icon: settings,
            },
          ]}
        />
      </Navigation>
    );

    return (
      <AppProvider
        theme={{
          logo: {
            width: 104,
            topBarSource:
              'https://cdn.shopify.com/shopify-marketing_assets/static/shopify-full-color-white.svg',
            contextualSaveBarSource:
              'https://cdn.shopify.com/shopify-marketing_assets/static/shopify-full-color-black.svg',
          },
          colors: {
            topBar: {
              color: '#f9fafb',
              background: 'rgb(28, 34, 96)',
              backgroundDarker: 'rgb(0, 8, 75)',
              backgroundLighter: 'rgb(67, 70, 127)',
            },
          },
        }}
      >
        <Frame
          showMobileNavigation={navigationVisible}
          navigation={navigationMarkup}
          topBar={topBar}
          onNavigationDismiss={() => this.handleDismiss()}
        >
          <Page title="Customers">
            <Layout>
              <Layout.Section>
                <Card>
                  <ResourceList
                    resourceName={resourceName}
                    items={items}
                    renderItem={this.renderItem}
                    selectedItems={this.state.selectedItems}
                    onSelectionChange={this.handleSelectionChange}
                    promotedBulkActions={promotedBulkActions}
                    bulkActions={bulkActions}
                  />
                </Card>
              </Layout.Section>
            </Layout>
          </Page>
        </Frame>
      </AppProvider>
    );
  }

  handleToggle = () => {
    this.setState(({navigationVisible}) => ({
      navigationVisible: !navigationVisible,
    }));
  };

  handleDismiss = () => {
    this.setState({navigationVisible: false});
  };

  renderItem = (item) => {
    const {id, url, name, location} = item;
    const media = <Avatar customer size="medium" name={name} />;

    return (
      <ResourceList.Item
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View details for ${name}`}
      >
        <h3>
          <TextStyle variation="strong">{name}</TextStyle>
        </h3>
        <div>{location}</div>
      </ResourceList.Item>
    );
  };

  handleSelectionChange = (selectedItems) => {
    this.setState({selectedItems});
  };
}
```

---

## Related components

- To display the navigation component on small screens, to provide search and a user menu, or to style the [frame](/components/structure/frame) component to reflect an application’s brand, use the [top bar](/components/structure/top-bar) component.
- To display the primary navigation within the frame of a non-embedded application, use the [navigation](/components/structure/navigation) component.
- To tell merchants their options once they have made changes to a form on the page use the [contextual save bar](/components/forms/contextual-save-bar) component.
- To provide quick, at-a-glance feedback on the outcome of an action, use the [toast](/components/feedback-indicators/toast) component.
- To indicate to merchants that a page is loading or an upload is processing use the [loading](/components/feedback-indicators/loading) component.
