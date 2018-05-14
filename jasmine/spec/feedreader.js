/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed in the allFeeds object and
         * tests if it has a URL defined
         * and that the URL is not empty.
         */
        it('has URL defined and is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined(); //tests if the URL is defined
                expect(feed.url.length).not.toBe(0); // tests if the URL is empty
            });
        });


        /* This test loops through each feed in the allFeeds object and
         * tests it has a name defined
         * and that the name is not empty.
         */
        it('has name and is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined(); //tests if the name is defined
                expect(feed.name.length).not.toBe(0); //tests if the name is empty
            });
        });
    });


    /* This test suite named "The menu" tests if:
    - the menu element is hidden by default
    - the menu changes visibility when the meny icon is clicked*/
    describe('The menu', function() {
        // This test ensures that the menu element is hidden by default
        it('the menu is hidden by default', function() {
          //check if the body has the class that hide the menu
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* this test ensures if the menu changes
        visibility when the menu icon is clicked*/
        it('the menu is visible on click and hidden on the second click', function() {
            // the menu display when clicked
                $('a.menu-icon-link').trigger('click') // show menu
                expect($('body').hasClass('menu-hidden')).not.toBe(true);

            // hide when clicked again.
                $('a.menu-icon-link').trigger('click') //hide menu
                expect($('body').hasClass('menu-hidden')).toBe(true);

        });
    });

    /* This test suite named "Initial Entries" ensures
     * when the loadFeed function is called there is at least
     * a single .entry element within the .feed container.
     * loadFeed() is asynchronous so this test
     * use Jasmine's beforeEach and asynchronous done() function.
    */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        // check if there is at least a single .entry element within the .feed container
        it('at least a single .entry element', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* This test suite named "New Feed Selection"
     * ensures when a new feed is loaded by the loadFeed function,
     * the content actually changes. */
    describe('New Feed Selection', function() {
        const feed = $('.feed');
        let previousFeed;
        /** loadFeed() is asynchronous so this test
        * use Jasmine's beforeEach and asynchronous done() function.*/
        beforeEach(function(done) {
            loadFeed(0, function() {
                previousFeed = feed.html(); //store previous feed
                loadFeed(1, done); // get newer feed
            });
        });

        /*  when a new feed is loaded the content changes.*/
        it('different from previous feed', function() {
            expect(feed.html()).not.toBe(previousFeed);
        });
    });
}());
