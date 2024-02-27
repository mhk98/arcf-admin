import React, { useLayoutEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Layout from "../layout/Index";
import Faq from "../pages/panel/e-commerce/Faq/Faq";
import About from "../pages/panel/e-commerce/about/About";
import AboutARCF from "../pages/panel/e-commerce/aboutARCF/AboutARCF";

import Banner from "../pages/panel/e-commerce/banner/Banner";

import AssistantViceChairman from "../pages/panel/e-commerce/assistantViceChairman/AssistantViceChairman";
import Chairman from "../pages/panel/e-commerce/chairman/Chairman";
import CurrentChairman from "../pages/panel/e-commerce/currentChairman/CurrentChairman";
import Director from "../pages/panel/e-commerce/director/Director";
import Donation from "../pages/panel/e-commerce/donation/Donation";
import DonationBannerDescription from "../pages/panel/e-commerce/donationBannerDescription/DonationBannerDescription";
import EventsBanner from "../pages/panel/e-commerce/events/EventsBanner";
import EventsDetails from "../pages/panel/e-commerce/events/EventsDetails";
import UpcomingEvents from "../pages/panel/e-commerce/events/UpcomingEvents";
import EventsCategoryDescription from "../pages/panel/e-commerce/eventsCategoryDescription/EventsCategoryDescription";
import GalleryBannerDescription from "../pages/panel/e-commerce/galleryBannerDescription/GalleryBannerDescription";
import Health from "../pages/panel/e-commerce/health/Health";
import ImageGallery from "../pages/panel/e-commerce/imageGallery/ImageGallery";

import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import RequireAuth from "../pages/auth/RequireAuth";
import Success from "../pages/auth/Success";
import AllUser from "../pages/panel/e-commerce/allUser/AllUser";
import ContactSlider from "../pages/panel/e-commerce/contactSlider/ContactSlider";
import Management from "../pages/panel/e-commerce/management/Management";
import NewsBanner from "../pages/panel/e-commerce/news/NewsBanner";
import NewsDetails from "../pages/panel/e-commerce/news/NewsDetails";
import UpcomingNews from "../pages/panel/e-commerce/news/UpcomingNews";
import NewsCategoryDescription from "../pages/panel/e-commerce/newsCategoryDescription/NewsCategoryDescription";
import ProjectSubCategory from "../pages/panel/e-commerce/projectSubCategory/ProjectSubCategory";
import ProjectSubCategoryDescription from "../pages/panel/e-commerce/projectSubCategoryDescription/ProjectSubCategoryDescription";
import ProjectSubCategoryHeader from "../pages/panel/e-commerce/projectSubCategoryHeader/ProjectSubCategoryHeader";
import ProjectBanner from "../pages/panel/e-commerce/projects/ProjectBanner";
import ProjectDetails from "../pages/panel/e-commerce/projects/ProjectDetails";
import Projects from "../pages/panel/e-commerce/projects/Projects";
import Slider from "../pages/panel/e-commerce/slider/Slider";
import ViceChairman from "../pages/panel/e-commerce/viceChairman/ViceChairman";
import VideoGallery from "../pages/panel/e-commerce/videoGallery/videoGallery";
import Volunteer from "../pages/panel/e-commerce/volunteer/Volunteer";

const Router = () => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      {/*Panel */}
      {/* <Route exact path={`${process.env.PUBLIC_URL}/ecommerce/index`} component={EcomDashboard}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/ecommerce/orders`} component={EcomOrder}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/ecommerce/products`} component={EcomProducts}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/ecommerce/support`} component={EcomSupport}></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/ecommerce/customer`}
          render={() => (
            <CustomerProvider>
              <EcomCustomer />
            </CustomerProvider>
          )}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/ecommerce/customer-details/:id`}
          render={(props) => (
            <CustomerProvider>
              <EcomCustomerDetails {...props} />
            </CustomerProvider>
          )}
        ></Route>
        
        <Route exact path={`${process.env.PUBLIC_URL}/ecommerce/settings`} component={EcomSettings}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/ecommerce/integration`} component={EcomIntegration}></Route> */}

      <Route path="/" element={<Layout />}>
        {/*Dashboards*/}
        {/* <Route index element={<Homepage />}></Route>
        <Route path="sales" element={<Sales />}></Route>
        <Route path="analytics" element={<Analytics />}></Route>
        <Route path="_blank" element={<Blank />}></Route> */}
        {/* <Route path="ecommerce"> */}
        {/* <Route index element={<EcomDashboard />}></Route> */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <AllUser />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/slider"
          element={
            <RequireAuth>
              <Slider />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="faq"
          element={
            <RequireAuth>
              <Faq />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="who-we-are"
          element={
            <RequireAuth>
              <About />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="banner"
          element={
            <RequireAuth>
              <Banner />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="about-arcf"
          element={
            <RequireAuth>
              <AboutARCF />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="ex-chairman"
          element={
            <RequireAuth>
              <Chairman />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="chairman"
          element={
            <RequireAuth>
              <CurrentChairman />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="vice-chairman"
          element={
            <RequireAuth>
              <ViceChairman />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="assistant-vice-chairman"
          element={
            <RequireAuth>
              <AssistantViceChairman />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="management"
          element={
            <RequireAuth>
              <Management />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="volunteer"
          element={
            <RequireAuth>
              <Volunteer />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="director"
          element={
            <RequireAuth>
              <Director />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="projects"
          element={
            <RequireAuth>
              <Projects />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="project-banner"
          element={
            <RequireAuth>
              <ProjectBanner />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="project-details"
          element={
            <RequireAuth>
              <ProjectDetails />
            </RequireAuth>
          }
        ></Route>

        <Route
          path="news-banner"
          element={
            <RequireAuth>
              <NewsBanner />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="news-details"
          element={
            <RequireAuth>
              <NewsDetails />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="news"
          element={
            <RequireAuth>
              <UpcomingNews />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="news-category-description"
          element={
            <RequireAuth>
              <NewsCategoryDescription />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="events"
          element={
            <RequireAuth>
              <UpcomingEvents />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="events-banner"
          element={
            <RequireAuth>
              <EventsBanner />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="events-details"
          element={
            <RequireAuth>
              <EventsDetails />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="events-category-description"
          element={
            <RequireAuth>
              <EventsCategoryDescription />
            </RequireAuth>
          }
        ></Route>

        <Route
          path="health"
          element={
            <RequireAuth>
              <Health />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="project-banner"
          element={
            <RequireAuth>
              <ProjectBanner />
            </RequireAuth>
          }
        ></Route>

        <Route
          path="project-subcategory"
          element={
            <RequireAuth>
              <ProjectSubCategory />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="project-subcategory-header"
          element={
            <RequireAuth>
              <ProjectSubCategoryHeader />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="project-subcategory-description"
          element={
            <RequireAuth>
              <ProjectSubCategoryDescription />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="gallery-category-description"
          element={
            <RequireAuth>
              <GalleryBannerDescription />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="image-gallery"
          element={
            <RequireAuth>
              <ImageGallery />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="video-gallery"
          element={
            <RequireAuth>
              <VideoGallery />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="donation-banner-description"
          element={
            <RequireAuth>
              <DonationBannerDescription />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="donation"
          element={
            <RequireAuth>
              <Donation />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="contact-slider"
          element={
            <RequireAuth>
              <ContactSlider />
            </RequireAuth>
          }
        ></Route>

        {/* <Route path="subcategory-details" element={<ProjectSubCategoryDetails />}></Route> */}
        {/* <Route path="health-banner" element={<HealthBanner />}></Route>
        <Route path="health-details" element={<HealthDetails />}></Route>
        <Route path="health-category-details" element={<HealthCategoryDetails />}></Route> */}
      </Route>

      {/* <Route path={`${process.env.PUBLIC_URL}`} element={<LayoutNoSidebar />}> */}
      <Route path="auth-success" element={<Success />}></Route>
      <Route path="auth-reset" element={<ForgotPassword />}></Route>
      <Route path="auth-register" element={<Register />}></Route>
      <Route path="auth-login" element={<Login />}></Route>
      {/* </Route> */}
      {/* </Route> */}
      {/*Pre-built Pages*/}
      {/* <Route path="project-card" element={<ProjectCardPage />}></Route>
        <Route path="project-list" element={<ProjectListPage />}></Route>

        <Route element={<UserContextProvider />}>
          <Route path="user-list-default" element={<UserListDefault />}></Route>
          <Route path="user-list-regular" element={<UserListRegular />}></Route>
          <Route path="user-list-compact" element={<UserListCompact />}></Route>
          <Route path="user-contact-card" element={<UserContactCard />}></Route>
          <Route path="user-details-regular/:userId" element={<UserDetails />}></Route>
        </Route>
        <Route>
          <Route path="user-profile-notification" element={<UserProfileNotification />}></Route>
          <Route path="user-profile-regular" element={<UserProfileRegular />}></Route>
          <Route path="user-profile-activity" element={<UserProfileActivity />}></Route>
          <Route path="user-profile-setting" element={<UserProfileSetting />}></Route>
        </Route> */}
      {/* <Route path="order-list-default" element={<OrderDefault />}></Route>
        <Route path="order-list-regular" element={<OrderRegular />}></Route>
        <Route path="order-list-sales" element={<OrderSales />}></Route>
        <Route path="kyc-list-regular" element={<KycListRegular />}></Route>
        <Route path="kyc-details-regular/:kycId" element={<KycDetailsRegular />}></Route> */}
      {/* <Route element={<ProductContextProvider />}>
          <Route path="product-list" element={<ProductList />}></Route>
          <Route path="product-card" element={<ProductCard />}></Route>
          <Route path="product-details/:productId" element={<ProductDetails />}></Route>
        </Route>
        <Route path="invoice-list" element={<InvoiceList />}></Route>
        <Route path="invoice-details/:invoiceId" element={<InvoiceDetails />}></Route>
        <Route path="pricing-table" element={<PricingTable />}></Route>
        <Route path="image-gallery" element={<GalleryPreview />}></Route> */}
      {/* <Route path="pages">
          <Route path="terms-policy" element={<Terms />}></Route>
          <Route path="faq" element={<Faq />}></Route>
          <Route path="regular-v1" element={<Regularv1 />}></Route>
          <Route path="regular-v2" element={<Regularv2 />}></Route>
        </Route> */}
      {/*Application*/}
      {/* <Route path="app-messages" element={<AppMessages />}></Route>
        <Route path="app-chat" element={<Chat />}></Route>
        <Route path="app-calender" element={<Calender />}></Route>
        <Route path="app-inbox" element={<Inbox />}></Route>
        <Route path="app-kanban" element={<Kanban />}></Route> */}
      {/* <Route path="app-file-manager">
          <Route index element={<FileManager />}></Route>
          <Route path="files" element={<FileManagerFiles />}></Route>
          <Route path="starred" element={<FileManagerStarred />}></Route>
          <Route path="shared" element={<FileManagerShared />}></Route>
          <Route path="recovery" element={<FileManagerRecovery />}></Route>
          <Route path="settings" element={<FileManagerSettings />}></Route>
        </Route> */}
      {/*Components*/}
      {/* <Route path="components">
          <Route index element={<Component />}></Route>
          <Route path="accordions" element={<Accordian />}></Route>
          <Route path="alerts" element={<Alerts />}></Route>
          <Route path="avatar" element={<Avatar />}></Route>
          <Route path="badges" element={<Badges />}></Route>
          <Route path="breadcrumbs" element={<Breadcrumbs />}></Route>
          <Route path="button-group" element={<ButtonGroup />}></Route>
          <Route path="buttons" element={<Buttons />}></Route>
          <Route path="cards" element={<Cards />}></Route>
          <Route path="carousel" element={<Carousel />}></Route>
          <Route path="dropdowns" element={<Dropdowns />}></Route>
          <Route path="form-elements" element={<FormElements />}></Route>
          <Route path="form-layouts" element={<FormLayouts />}></Route>
          <Route path="checkbox-radio" element={<CheckboxRadio />}></Route>
          <Route path="advanced-control" element={<AdvancedControls />}></Route>
          <Route path="input-group" element={<InputGroup />}></Route>
          <Route path="form-upload" element={<FormUpload />}></Route>
          <Route path="number-spinner" element={<NumberSpinner />}></Route>
          <Route path="form-validation" element={<FormValidation />}></Route>
          <Route path="datetime-picker" element={<DateTimePicker />}></Route>
          <Route path="modals" element={<Modals />}></Route>
          <Route path="pagination" element={<Pagination />}></Route>
          <Route path="popovers" element={<Popovers />}></Route>
          <Route path="progress" element={<Progress />}></Route>
          <Route path="spinner" element={<Spinner />}></Route>
          <Route path="tabs" element={<Tabs />}></Route>
          <Route path="toast" element={<Toast />}></Route>
          <Route path="tooltips" element={<Tooltips />}></Route>
          <Route path="typography" element={<Typography />}></Route>
          <Route path="noUislider" element={<NouiSlider />}></Route>
          <Route path="wizard-basic" element={<WizardForm />}></Route>
          <Route path="quill" element={<QuillPreview />}></Route>
          <Route path="tinymce" element={<TinymcePreview />}></Route>
          <Route path="util-border" element={<UtilBorder />}></Route>
          <Route path="util-colors" element={<UtilColors />}></Route>
          <Route path="util-display" element={<UtilDisplay />}></Route>
          <Route path="util-embeded" element={<UtilEmbeded />}></Route>
          <Route path="util-flex" element={<UtilFlex />}></Route>
          <Route path="util-others" element={<UtilOthers />}></Route>
          <Route path="util-sizing" element={<UtilSizing />}></Route>
          <Route path="util-spacing" element={<UtilSpacing />}></Route>
          <Route path="util-text" element={<UtilText />}></Route>

          <Route path="widgets">
            <Route path="cards" element={<CardWidgets />}></Route>
            <Route path="charts" element={<ChartWidgets />}></Route>
            <Route path="rating" element={<RatingWidgets />}></Route>
          </Route>

          <Route path="misc">
            <Route path="slick-slider" element={<SlickPage />}></Route>
            <Route path="sweet-alert" element={<SweetAlertPage />}></Route>
            <Route path="beautiful-dnd" element={<BeautifulDnd />}></Route>
            <Route path="dual-list" element={<DualListPage />}></Route>
            <Route path="map" element={<GoogleMapPage />}></Route>
            <Route path="toastify" element={<ReactToastify />}></Route>
            <Route path="jsTree" element={<JsTreePreview />}></Route>
          </Route>
        </Route> */}
      {/* <Route path="charts">
          <Route path="chartjs" element={<ChartPage />}></Route>
          <Route path="knobs" element={<KnobPreview />}></Route>
        </Route> */}
      {/* <Route path="table-basic" element={<BasicTable />}></Route>
        <Route path="table-datatable" element={<DataTablePage />}></Route>
        <Route path="table-special" element={<SpecialTablePage />}></Route>
        <Route path="email-template" element={<EmailTemplate />}></Route>
        <Route path="nioicon" element={<NioIconPage />}></Route>
        <Route path="svg-icons" element={<SVGIconPage />}></Route> */}

      {/* <Route path={`${process.env.PUBLIC_URL}`} element={<LayoutNoSidebar />}>
        <Route path="auth-success" element={<Success />}></Route>
        <Route path="auth-reset" element={<ForgotPassword />}></Route>
        <Route path="auth-register" element={<Register />}></Route>
        <Route path="auth-login" element={<Login />}></Route>

        <Route path="errors">
          <Route path="404-modern" element={<Error404Modern />}></Route>
          <Route path="404-classic" element={<Error404Classic />}></Route>
          <Route path="504-modern" element={<Error504Modern />}></Route>
          <Route path="504-classic" element={<Error504Classic />}></Route>
        </Route>
        <Route path="*" element={<Error404Modern />}></Route>

        <Route path="invoice-print/:invoiceId" element={<InvoicePrint />}></Route>
      </Route> */}
    </Routes>
  );
};
export default Router;
