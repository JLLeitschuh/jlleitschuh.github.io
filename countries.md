---
title: Countries
---

# Countries I've Visited

Below is the globe highlighting the countries I've been to, along with a list of countries I'd still like to visit.

<div id="globeViz"></div>

<div class="countries-columns">
  <div class="countries-column">
    <h2>Visited ({{ site.data.countries.visited | size }})</h2>
    <ul>
    {% assign visited_sorted = site.data.countries.visited | sort %}
    {% for country in visited_sorted %}
      <li data-country="{{ country }}">{{ country }}</li>
    {% endfor %}
    </ul>
  </div>
  <div class="countries-column">
    <h2>Want to Visit ({{ site.data.countries.wishlist | size }})</h2>
    <ul>
    {% assign wishlist_sorted = site.data.countries.wishlist | sort %}
    {% for country in wishlist_sorted %}
      <li data-country="{{ country }}">{{ country }}</li>
    {% endfor %}
    </ul>
  </div>
</div>

<link rel="stylesheet" href="/assets/css/countries.css">

<script src="https://unpkg.com/globe.gl"></script>
<script src="/assets/js/countries.js"></script>
