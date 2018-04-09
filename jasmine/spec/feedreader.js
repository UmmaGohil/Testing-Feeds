/* feedreader.js*/

/* Placing all tests within the $() function,
 * since some of these tests may require DOM elements. Want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* Test suite: RSS Feeds 
    * This test suite is  about the RSS
    * feeds definitions, the allFeeds variable in the application.
    */
    describe('RSS Feeds', function() {
        /* Tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URL is defined and not empty', function () {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
         });

        /* Loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
          it('Name is defined and not empty', function () {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
         });
    });


    /* Test suite: "The menu" */
    describe('The Menu', function() {
        /* A test that ensures the menu element is
         * hidden by default. 
         */
        it('Menu element is hidden', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */
        it('Menu changes when icon clicked', function () {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    /* Test suite: "Initial Entries" */
    describe('Initial Entries', function() {
        /* A asynchronous test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
        /*
        At least one entry in loadFeed 
        */
        it('At least a single entry', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });


    /* Test suite: "New Feed Selection" */
    describe('New Feed Selection', function() {

        var feedEntry1;
        var feedEntry2;

        beforeEach(function(done) {
            loadFeed(0, function() {
                feedEntry1 = $('.feed').html();
                done();
            });
        });
        /* A test that ensures a new feed is loaded
        * each time and the content changes  
        */
        it('New feed loaded and content changes', function(done) {
            loadFeed(1, function() {
                feedEntry2 = $('.feed').html();
                expect(feedEntry2).not.toEqual(feedEntry1);
                done();
            });
        });
    });
}());
