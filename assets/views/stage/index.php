                
            <header class="stage layout">
                <div class="content">
                    <h1 class="tl1"><?php echo $args["title"]?></h1>  
                    <?php if($args["intro"]): ?>
                        <div class="intro"><?php echo $args["intro"]?></div>
                    <?php endif; ?>
                </div>
                <picture>
                    <img src="<?php echo $args["image"]?>" alt="">
                </picture>
            </header>
