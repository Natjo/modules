<?php include("common/top.php"); ?>

<main>
    <div class="sidebar">
 <!--        <nav>
            <h1>Views</h1>
            <div>
                <button>Views</button>
                <button>Modules</button>
            </div>
            <input type="text">
        </nav> -->

        <div>
            <h3>Headers</h3>
            <ul>
                <li data-view="header-1">
                    <button class="btn-see">header 1</button>
                </li>
                <li data-view="header-2">
                    <button class="btn-see">header 2</button>
                </li>
            </ul>

            <h3>Post headers</h3>

            <h3>Heros</h3>
            <ul>
                <li>
                    <button>home 1</button>
                </li>
                <li>
                    <button>home 2</button>
                </li>
                <li>
                    <button>page 1</button>
                </li>
                <li>
                    <button>article 1</button>
                </li>
            </ul>

            <h3>Strates</h3>
            <ul>
                <li>
                    <button>intro 1</button>
                </li>
            </ul>

            <h3>Blocks</h3>
            <ul>
                <li><button>chiffre cles 1</button></li>
            </ul>

            <h3>Breadcrumb</h3>
            <ul>
                <li><button>breadcrumb 1</button></li>
            </ul>

            <h3>Pre footer</h3>

            <h3>Footer</h3>
            <ul>
                <li><button>footer 1</button></li>
                <li><button>footer 2</button></li>
            </ul>

            <h3>Rgpd</h3>
            <ul>
                <li><button>rgpd</button></li>
            </ul>


            <h3>Formulaires</h3>
            <ul>
                <li>
                    <button>formulaire</button>
                </li>
            </ul>

            <h3>Pagers</h3>
            <ul>
                <li>
                    <button>Pushs with pager</button>
                </li>
            </ul>

            <h3>Filters</h3>
            <ul>
                <li>
                    <button>Pushs with filter</button>
                </li>
            </ul>

            <h3>Slider</h3>
            <ul>
                <li>
                    <button>Slider</button>
                </li>
                <li>
                    <button>carousel</button>
                </li>
            </ul>

            <h3>Filters</h3>
            <ul>
                <li>
                    <button>Simple push filter</button>
                </li>
            </ul>
        </div>
        <hr>

        <h2>Modules</h2>
        <h3>Formulaire</h3>
        <ul>
            <li><button>formValidate</button></li>
            <li><button>labelPlaceholder</button></li>
        </ul>
        <h3>Modals</h3>
        <ul>
            <li><button>Modals</button></li>
            <li><button>popins</button></li>
        </ul>

    </div>
    <section class="main-content">

        <!-- header-1 -->
        <section>
            <?php include("assets/views/header-1/README.md"); ?>
            <iframe src="header-1.php" frameborder="0"></iframe>
            <?php
            views('header-1', array(
                "navigation" => array(
                    array(
                        "name" => "Home",
                        "href" => "/"
                    ),
                    array(
                        "name" => "Contact",
                        "href" => "/contact"
                    ),
                    array(
                        "name" => "Articles",
                        "href" => "/archive"
                    ),
                ),
                "options" => ""
            ));
            ?>
        </section>

        <!-- stage-article -->
        <section>
            <?php include("assets/views/stage-article/README.md"); ?>
            <?php views('stage-article'); ?>
        </section>

        <!-- footer-1 -->
        <section>
            <?php include("assets/views/footer/README.md"); ?>
            <?php views('footer'); ?>
        </section>





    </section>
</main>

<?php include("common/bottom.php"); ?>