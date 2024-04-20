module Jekyll
    class SortedTagsGenerator < Generator
      safe true
      priority :low
  
      def generate(site)
        # Collect all tags and their post counts
        tag_counts = {}
        site.tags.each do |tag, posts|
          tag_counts[tag] = posts.size
        end
  
        # Sort tags by the number of posts, in descending order
        binding.pry
        sorted_tags = tag_counts.sort_by { |_tag, count| -count }
  
        # Store the sorted tags in site data for access in Liquid templates
        site.data['sorted_tags'] = sorted_tags
      end
    end
  end
  